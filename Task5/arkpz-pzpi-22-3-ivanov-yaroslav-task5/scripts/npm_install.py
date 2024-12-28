import sys
import subprocess
import os

# Installs npm dependencies in the server directory
def install_npm_dependencies():
    server_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "server"))
    
    try:
        print(f"Running 'npm install' in {server_directory}...")
        result = subprocess.run("npm install", cwd=server_directory, check=True, text=True, capture_output=True, shell=True)
        print("npm install run successfully:")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error during 'npm install': {e.stderr}", file=sys.stderr)
        raise