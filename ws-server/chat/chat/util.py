import os
def load_env_vars():
    """Load environment variables from .env file."""
    env_path = os.path.join(os.getcwd(), '.env')
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                var = line.strip().split('=')
                if not os.environ.get(var[0]):
                    if len(var) == 2:
                        os.environ[var[0]] = var[1]
