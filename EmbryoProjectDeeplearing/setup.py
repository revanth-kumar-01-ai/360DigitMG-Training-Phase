import setuptools

__version__ = "0.0.0"


REPO_NAME = "360DigitMG-Training-Phase"
AUTHOR_USER_NAME = "revanth-kumar-01-ai"
SRC_REPO = "EmbryoQualityCheck"
AUTHOR_EMAIL = "revanthk486@gmail.com"

setuptools.setup(
    name=SRC_REPO,
    version=__version__,
    author=AUTHOR_USER_NAME,
    author_email=AUTHOR_EMAIL,
    description= """
       Deep learning-based IVF project to classify embryos, reduce errors, and improve ART success.
    """,
    long_description="""
            🔍 This IVF project uses deep learning to grade embryo quality and reduce human error.  
            📊 It classifies embryos into 10 types: 8-cell (a, b, c), morula (a, b, c), and blastocyst (a, b, c), plus error images.  
            🎯 The goal is to boost ART success rates and reduce treatment costs for hopeful parents.
    """,
    long_description_content="text/markdown",
    url=f"https://github.com/{AUTHOR_USER_NAME}/{REPO_NAME}",
    project_urls={
        "Bug Tracker": f"https://github.com/{AUTHOR_USER_NAME}/{REPO_NAME}/issues",
    },
    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src")
)