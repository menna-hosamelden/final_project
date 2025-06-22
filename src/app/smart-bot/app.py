from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import requests

app = Flask(__name__)
CORS(app)

# الأسئلة الثابتة
faq = {
    "ما هي الخدمات التي يقدمها الموقع؟": "الموقع يتيح لك بيع، تأجير، تبديل أو التبرع بالملابس بكل سهولة.",
    "إزاي أقدر أبيع قطعة ملابس؟": "سجل حساب، اختار إضافة منتج، واملأ البيانات المطلوبة مع صور للقطعة.",
    "هل ممكن أتبرع بملابس؟ وإزاي؟": "أيوه، تقدر تختار (تبرع) عند إضافة المنتج وسيتم توصيله للمحتاجين.",
    "هل ممكن أأجر لبسي؟": "طبعًا، تقدر تعرض اللبس للإيجار وتحدد السعر واليوم.",
    "هل ممكن أتواصل مع البائع قبل ما أشتري؟": "نعم، يوجد خاصية محادثة مباشرة بين المستخدمين."
}




@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('message')

    if question in faq:
        answer = faq[question]
    else:
        print("❓ سؤال غير موجود: " + question)
        try:
            headers = {
                "Authorization": "Bearer tgp_v1_aRgCZildLzrf_rjo3ztpYzrxKlwYhcTYPK7JbifMfbs",  
                "Content-Type": "application/json"
            }
            payload = {
                "model": "meta-llama/Llama-3-8b-chat-hf",  
                "messages": [
                    {"role": "system", "content": "أنت مساعد ذكي من موقع Preloved Attire متخصص في بيع وتبديل وتأجير الملابس."},
                    {"role": "user", "content": question}
                ]
            }
            res = requests.post("https://api.together.xyz/v1/chat/completions", headers=headers, json=payload)
            print("🔄 استجابة Together API:", res.status_code, res.text)

            res_json = res.json()
            if "choices" in res_json:
                answer = res_json["choices"][0]["message"]["content"]
            else:
                answer = "لم أتمكن من فهم سؤالك حاليًا. برجاء المحاولة لاحقًا."
            
            
        except Exception as e:
            print("❌ خطأ مع Together API أو SendGrid:", e)
            answer = "حدث خطأ أثناء محاولة فهم سؤالك. من فضلك حاول لاحقًا."

    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(debug=True)
