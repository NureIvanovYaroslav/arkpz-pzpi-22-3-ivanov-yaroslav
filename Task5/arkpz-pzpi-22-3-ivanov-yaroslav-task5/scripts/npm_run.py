import sys
import subprocess
import os

# Starts the npm development server in the server directory
def start_npm_dev_server():
    server_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "server"))
    
    try:
        print(f"Running 'npm run dev' successfully in {server_directory}")
        print(f"Server is running at http://localhost:5000/docs")

        result = subprocess.run("npm run dev", cwd=server_directory, check=True, text=True, capture_output=True, shell=True)
        print("Server started successfully:")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error during 'npm run dev': {e.stderr}", file=sys.stderr)
        raise
    except KeyboardInterrupt:
        print("Server stopped by user.")
        sys.exit(0)