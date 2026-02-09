
from PIL import Image, ImageDraw

def create_circular_logo(input_path, output_path):
    # Open the image
    img = Image.open(input_path).convert("RGBA")
    
    # Create mask
    mask = Image.new('L', img.size, 0)
    draw = ImageDraw.Draw(mask)
    
    # Calculate crop area to make it a square
    width, height = img.size
    size = min(width, height)
    
    # Calculate coordinates for centered crop
    left = (width - size) // 2
    top = (height - size) // 2
    right = (width + size) // 2
    bottom = (height + size) // 2
    
    # Crop image and mask to square
    img = img.crop((left, top, right, bottom))
    mask = mask.crop((left, top, right, bottom))
    
    # Draw circle on mask
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    
    # Apply mask to image
    img.putalpha(mask)
    
    # Save as PNG
    img.save(output_path, "PNG")

if __name__ == "__main__":
    create_circular_logo("logo.jpeg", "favicon-circle.png")
