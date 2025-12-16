from google import genai
from google.genai import types
import base64
import os

# CONFIGURATION FOR PANEL 4
PANEL_NAME = "panel_4_hotfix_strike"
ASPECT_RATIO = "16:9" 
PROMPT_TEXT = """
Dynamic action shot. Nubus (cute white puffy cloud with headphones) is mid-air, slicing through a "Cable Snake" with a glowing blue energy blade (representing a Hotfix). "Impact frame" style—high contrast, black and white background with neon blue accents.
Style: Manga action style, impact frame, high energy, neon accents.
"""

def generate_panel():
    client = genai.Client(
        vertexai=False,
        api_key=os.environ.get("GEMINI_API_KEY"),
    )

    print(f"--- Generating {PANEL_NAME} ---")

    msg = types.Part.from_text(text=PROMPT_TEXT)

    contents = [
        types.Content(
            role="user",
            parts=[msg]
        ),
    ]

    generate_content_config = types.GenerateContentConfig(
        temperature=1,
        top_p=0.95,
        max_output_tokens=32768,
        response_modalities=["TEXT", "IMAGE"],
        safety_settings=[
            types.SafetySetting(category="HARM_CATEGORY_HATE_SPEECH", threshold="OFF"),
            types.SafetySetting(category="HARM_CATEGORY_DANGEROUS_CONTENT", threshold="OFF"),
            types.SafetySetting(category="HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold="OFF"),
            types.SafetySetting(category="HARM_CATEGORY_HARASSMENT", threshold="OFF")
        ],
        image_config=types.ImageConfig(
            aspect_ratio=ASPECT_RATIO,
        ),
    )

    # Stream response to handle both text (Narrative) and Image
    response_stream = client.models.generate_content_stream(
        model="gemini-3-pro-image-preview",
        contents=contents,
        config=generate_content_config,
    )

    for chunk in response_stream:
        # Handle Text (Voiceover/Story)
        if chunk.text:
            print(f"\n[NARRATIVE VOICEOVER]: {chunk.text}")
        
        # Handle Image (Save to Disk)
        if chunk.parts:
            for part in chunk.parts:
                if part.inline_data:
                    file_path = f"{PANEL_NAME}.png"
                    with open(file_path, "wb") as f:
                        f.write(part.inline_data.data)
                    print(f"\n[SUCCESS] Image saved to: {file_path}")

# Run the generation
generate_panel()
