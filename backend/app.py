from flask import Flask, request, jsonify
from flask_cors import CORS
from pytube import YouTube

app = Flask(__name__)
CORS(app)

@app.route('/', methods=["GET"])
def index():
    response = {
        'message': "hello world"
    }
    return jsonify(response)

@app.route('/process_video', methods=['POST'])
def process_video():
    video_url = request.json['video_url']
    try:
        yt = YouTube(video_url)
        video = yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first()
        video_thumbnail = yt.thumbnail_url
        
        response = {
            'download_url': video.url,
            'thumbnail_url': video_thumbnail,
            'success': True
        }
    except Exception as e:
        response = {
            'success': False,
            'error': str(e)
        }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
