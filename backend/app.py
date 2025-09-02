from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import json

app = FastAPI()

# Allow frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/search")
def search(username: str):
    if not username:
        raise HTTPException(status_code=400, detail="Username is required")

    try:
        # Call Sherlock as CLI
        cmd = ["python3", "sherlock/sherlock.py", username, "--json"]
        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=result.stderr)

        sherlock_data = json.loads(result.stdout)

        # Normalize output for frontend
        results = []
        for site, data in sherlock_data.items():
            if data.get("status") == "Claimed":
                results.append({
                    "site": site,
                    "url": data.get("url_user"),
                    "username": username,
                    "icon": f"/icons/{site.lower()}.png",
                    "profilePic": None  # extend later
                })

        return {"results": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
