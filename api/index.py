from flask import Flask, request, jsonify, abort
from api.src.similar_maps import get_similar_maps

app = Flask(__name__)

@app.route("/api/similar")
def similar():
    beatmap_id = request.args.get("beatmap_id", type=int)
    if not beatmap_id:
        abort(400, "beatmap_id query-param required, e.g. /similar?beatmap_id=4837918")

    maps = get_similar_maps(beatmap_id)[:10]
    return jsonify({"similar": maps})
