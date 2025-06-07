import os

BASE_DIR = os.getcwd()
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
PROPOSAL_DIR = os.path.join(BASE_DIR, "proposals")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROPOSAL_DIR, exist_ok=True)
