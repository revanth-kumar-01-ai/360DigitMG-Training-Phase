import base64 
import mimetypes

def convert_image_to_base64(image_path):
    try:
        # Get the MIME type based on the file extension
        mime_type, _ = mimetypes.guess_type(image_path)
        if not mime_type:
            mime_type = "image/jpeg"  # Default to jpeg if MIME type is not found
        
        # Open the image in binary mode
        with open(image_path, "rb") as image_file:
            # Convert image to base64
            base64_string = base64.b64encode(image_file.read()).decode('utf-8')

        # Return the data URL format: data:${mimeType};base64,${base64String}
        return f"data:{mime_type};base64,{base64_string}"
    
    except Exception as e:
        return f"Error: {str(e)}"


# Path to your image
image_path = r"a:\artificial intelligence\intership works\embryo project\embryo-project-deeplearning\src\EmbryoQualityCheck\flask_backend_app\app\utils\..\..\XAI_images\ca46569213ff41bfa84239bf56f48108_cam.jpg"

# Convert to base64
base64_image = convert_image_to_base64(image_path)
print(base64_image)