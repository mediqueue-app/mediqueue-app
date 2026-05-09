from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import time

app = Flask(__name__)
CORS(app)
app.json.ensure_ascii = False

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE_DIR, 'dataset.json'), encoding='utf-8') as f:
    dataset = json.load(f)

with open(os.path.join(BASE_DIR, 'semptom_eslesme.json'), encoding='utf-8') as f:
    semptom_data = json.load(f)

doctors = dataset['doktorlar']
semptom_map = semptom_data['semptom_eslesme']
belirsiz_map = semptom_data['belirsiz_semptomlar']

def find_specialty(symptom):
    symptom = symptom.lower().strip()
    for specialty, keywords in semptom_map.items():
        for keyword in keywords:
            if keyword.lower() in symptom or symptom in keyword.lower():
                return specialty
    for keyword, specialties in belirsiz_map.items():
        if keyword.lower() in symptom:
            return specialties[0]
    return None

@app.route('/api/symptom', methods=['POST'])
def get_recommendations():
    data = request.get_json(force=True)
    symptom = data.get('symptom', '')
    country = data.get('country', 'Almanya')
    language = data.get('language', '')
    budget_max = data.get('budget_max', None)

    time.sleep(1.5)

    specialty = find_specialty(symptom)

    if specialty:
        filtered = [d for d in doctors if d['specialty'] == specialty]
    else:
        filtered = list(doctors)

    if language:
        lang_filtered = [d for d in filtered if language in d['languages']]
        if lang_filtered:
            filtered = lang_filtered

    if budget_max:
        budget_filtered = []
        for d in filtered:
            try:
                min_price = int(d['price_range'].split('-')[0])
                if min_price <= int(budget_max):
                    budget_filtered.append(d)
            except:
                budget_filtered.append(d)
        if budget_filtered:
            filtered = budget_filtered

    result = sorted(filtered, key=lambda x: x['score'], reverse=True)[:3]

    return jsonify({
        "symptom": symptom,
        "country": country,
        "matched_specialty": specialty or "Genel Diş",
        "recommendations": result
    })

@app.route('/api/booking', methods=['POST'])
def create_booking():
    data = request.get_json(force=True)
    return jsonify({
        "status": "confirmed",
        "booking_id": "MQ-2024-001",
        "doctor": data.get('doctor_name'),
        "clinic": data.get('clinic_name'),
        "date": data.get('date'),
        "message": "Rezervasyonunuz alındı. Detaylar e-postanıza gönderildi."
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)