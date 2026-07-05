from datetime import datetime, timezone
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.models.review import Review


def _sample_review(**overrides: object) -> Review:
    defaults = {
        "id": 1,
        "clinic_id": 10,
        "doctor_id": None,
        "patient_id": 1,
        "rating": 5,
        "comment": "Excellent care",
        "sentiment_label": None,
        "sentiment_score": None,
        "ai_summary": None,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }
    defaults.update(overrides)
    return Review(**defaults)


CLINIC_REVIEW_PAYLOAD = {
    "clinic_id": 10,
    "rating": 5,
    "comment": "Great clinic experience",
}

DOCTOR_REVIEW_PAYLOAD = {
    "doctor_id": 5,
    "rating": 4,
    "comment": "Very professional doctor",
}


class TestCreateReview:
    @patch("app.api.v1.reviews.create_review")
    @patch("app.api.v1.reviews.clinic_exists", return_value=True)
    def test_patient_can_create_clinic_review(
        self,
        _mock_clinic_exists,
        mock_create_review,
        authenticated_client: TestClient,
    ) -> None:
        mock_create_review.return_value = _sample_review()

        response = authenticated_client.post("/v1/reviews", json=CLINIC_REVIEW_PAYLOAD)

        assert response.status_code == 201
        body = response.json()
        assert body["clinic_id"] == 10
        assert body["doctor_id"] is None
        assert body["rating"] == 5
        mock_create_review.assert_called_once()

    @patch("app.api.v1.reviews.create_review")
    @patch("app.api.v1.reviews.get_doctor")
    def test_patient_can_create_doctor_review(
        self,
        mock_get_doctor,
        mock_create_review,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_doctor.return_value = object()
        mock_create_review.return_value = _sample_review(
            clinic_id=None,
            doctor_id=5,
            rating=4,
            comment="Very professional doctor",
        )

        response = authenticated_client.post("/v1/reviews", json=DOCTOR_REVIEW_PAYLOAD)

        assert response.status_code == 201
        body = response.json()
        assert body["doctor_id"] == 5
        assert body["clinic_id"] is None

    @patch("app.api.v1.reviews.create_review")
    def test_non_patient_cannot_create_review(
        self,
        mock_create_review,
        admin_client: TestClient,
    ) -> None:
        response = admin_client.post("/v1/reviews", json=CLINIC_REVIEW_PAYLOAD)

        assert response.status_code == 403
        mock_create_review.assert_not_called()

    @patch("app.api.v1.reviews.create_review")
    def test_unauthenticated_cannot_create_review(
        self,
        mock_create_review,
        client: TestClient,
    ) -> None:
        response = client.post("/v1/reviews", json=CLINIC_REVIEW_PAYLOAD)

        assert response.status_code == 401
        mock_create_review.assert_not_called()

    def test_rating_below_one_rejected(self, authenticated_client: TestClient) -> None:
        payload = {**CLINIC_REVIEW_PAYLOAD, "rating": 0}

        response = authenticated_client.post("/v1/reviews", json=payload)

        assert response.status_code == 422
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "VALIDATION_ERROR"

    def test_rating_above_five_rejected(self, authenticated_client: TestClient) -> None:
        payload = {**CLINIC_REVIEW_PAYLOAD, "rating": 6}

        response = authenticated_client.post("/v1/reviews", json=payload)

        assert response.status_code == 422

    def test_missing_both_targets_rejected(self, authenticated_client: TestClient) -> None:
        payload = {"rating": 5, "comment": "No target"}

        response = authenticated_client.post("/v1/reviews", json=payload)

        assert response.status_code == 422

    def test_both_targets_rejected(self, authenticated_client: TestClient) -> None:
        payload = {
            "clinic_id": 10,
            "doctor_id": 5,
            "rating": 5,
            "comment": "Both targets",
        }

        response = authenticated_client.post("/v1/reviews", json=payload)

        assert response.status_code == 422


class TestListClinicReviews:
    @patch("app.api.v1.clinics.get_reviews_by_clinic")
    @patch("app.api.v1.clinics.get_clinic")
    def test_list_clinic_reviews_returns_reviews(
        self,
        mock_get_clinic,
        mock_get_reviews,
        client: TestClient,
    ) -> None:
        mock_get_clinic.return_value = object()
        mock_get_reviews.return_value = [_sample_review(), _sample_review(id=2)]

        response = client.get("/v1/clinics/10/reviews")

        assert response.status_code == 200
        body = response.json()
        assert len(body) == 2
        assert body[0]["clinic_id"] == 10

    @patch("app.api.v1.clinics.get_clinic", return_value=None)
    def test_list_clinic_reviews_returns_404_for_missing_clinic(
        self,
        _mock_get_clinic,
        client: TestClient,
    ) -> None:
        response = client.get("/v1/clinics/999/reviews")

        assert response.status_code == 404

    @patch("app.api.v1.clinics.get_reviews_by_clinic")
    @patch("app.api.v1.clinics.get_clinic")
    def test_clinic_reviews_pagination_limit(
        self,
        mock_get_clinic,
        mock_get_reviews,
        client: TestClient,
    ) -> None:
        mock_get_clinic.return_value = object()
        mock_get_reviews.return_value = []

        response = client.get("/v1/clinics/10/reviews?skip=5&limit=10")

        assert response.status_code == 200
        mock_get_reviews.assert_called_once()
        _, kwargs = mock_get_reviews.call_args
        assert kwargs["skip"] == 5
        assert kwargs["limit"] == 10


class TestListDoctorReviews:
    @patch("app.api.v1.doctors.get_reviews_by_doctor")
    @patch("app.api.v1.doctors.get_doctor")
    def test_list_doctor_reviews_returns_reviews(
        self,
        mock_get_doctor,
        mock_get_reviews,
        client: TestClient,
    ) -> None:
        mock_get_doctor.return_value = object()
        mock_get_reviews.return_value = [
            _sample_review(clinic_id=None, doctor_id=5),
        ]

        response = client.get("/v1/doctors/5/reviews")

        assert response.status_code == 200
        body = response.json()
        assert len(body) == 1
        assert body[0]["doctor_id"] == 5

    @patch("app.api.v1.doctors.get_doctor", return_value=None)
    def test_list_doctor_reviews_returns_404_for_missing_doctor(
        self,
        _mock_get_doctor,
        client: TestClient,
    ) -> None:
        response = client.get("/v1/doctors/999/reviews")

        assert response.status_code == 404

    @patch("app.api.v1.doctors.get_reviews_by_doctor")
    @patch("app.api.v1.doctors.get_doctor")
    def test_doctor_reviews_pagination_limit(
        self,
        mock_get_doctor,
        mock_get_reviews,
        client: TestClient,
    ) -> None:
        mock_get_doctor.return_value = object()
        mock_get_reviews.return_value = []

        response = client.get("/v1/doctors/5/reviews?skip=2&limit=20")

        assert response.status_code == 200
        mock_get_reviews.assert_called_once()
        _, kwargs = mock_get_reviews.call_args
        assert kwargs["skip"] == 2
        assert kwargs["limit"] == 20
