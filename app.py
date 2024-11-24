import streamlit as st
from PIL import Image
import os

# Set up the page configuration
st.set_page_config(page_title="Om Prakash | Data Science Portfolio", layout="wide")

# Sidebar setup
st.sidebar.title("Om Prakash Portfolio")

# Profile Image in Sidebar (rounded)
profile_image = Image.open("profile_picture.png")  # Replace with your profile image
st.sidebar.image(profile_image, use_container_width=True, caption="Om Prakash", width=150)

# Logo Image in Sidebar (with error handling)
logo_path = "logo.png"  # Ensure this path is correct relative to your working directory
if os.path.exists(logo_path):
    logo = Image.open(logo_path)
    st.sidebar.image(logo, use_container_width=True)
else:
    st.sidebar.error(f"Logo file not found at path: {logo_path}")

# Social Media Icons in Sidebar (Font Awesome icons for GitHub, LinkedIn, etc.)
st.sidebar.markdown("""
### Connect with Me:
- [![LinkedIn](https://img.icons8.com/ios/50/000000/linkedin.png)](https://www.linkedin.com/in/om-prakash)
- [![GitHub](https://img.icons8.com/ios/50/000000/github.png)](https://github.com/121omprakash)
- [![Email](https://img.icons8.com/ios/50/000000/new-post.png)](mailto:omimucet@gmail.com)
""")

# Main Content of Portfolio

# Add Navbar for easy navigation
st.markdown("""
    <style>
    .navbar a {
        font-size: 18px;
        padding: 14px 20px;
        text-decoration: none;
        color: #4CAF50;
        border-radius: 5px;
    }
    .navbar a:hover {
        background-color: #ddd;
        color: black;
    }
    </style>
    <div class="navbar">
        <a href="#summary">Summary</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
    </div>
""", unsafe_allow_html=True)

# Summary Section
st.header("Om Prakash - Data Analyst")
st.subheader("Data Science Enthusiast")

st.markdown("""
I am a detail-oriented Data Analyst with a strong foundation in Python, SQL, and Data Science. I enjoy solving real-world problems using data and machine learning, with a focus on deriving actionable insights that drive business decisions. 
""")

# Projects Section
st.markdown("<a id='projects'></a>", unsafe_allow_html=True)
st.subheader("Projects")

# Project 1: Heart Disease Prediction
st.markdown("### [Heart Disease Prediction](https://github.com/121omprakash/Heart-Disease-Prediction)")
st.write("Developed a logistic regression model achieving 94% training and 93% testing accuracy, predicting heart disease risk.")
heart_disease_image = Image.open("heart.png")  # Ensure this image is in your project folder
st.image(heart_disease_image, caption="Heart Disease Prediction Model", width=400)

# Project 2: Unemployment in India Analysis
st.markdown("### [Unemployment in India Analysis](https://github.com/121omprakash/Unemployment-India-Analysis)")
st.write("Analyzed unemployment trends in India using Pandas and Seaborn; provided insights into demographic and regional factors.")
unemployment_image = Image.open("unemployment.png")  # Ensure this image is in your project folder
st.image(unemployment_image, caption="Unemployment Analysis", width=400)

# Project 3: Mental Health Analysis of Students
st.markdown("### [Analyzing Students' Mental Health](https://www.datacamp.com/projects/analysis-of-students-mental-health)")
st.write("Performed SQL-based analysis on student mental health datasets, deriving insights for intervention strategies.")
mental_health_image = Image.open("mental.png")  # Ensure this image is in your project folder
st.image(mental_health_image, caption="Students' Mental Health Analysis", width=400)

# Project 4: Netflix Movie Analysis
st.markdown("### [Investigating Netflix Movies](https://www.datacamp.com/projects/investigating-netflix-movies)")
st.write("Explored and visualized Netflix movie dataset, analyzing genres, release trends, and viewer ratings.")
netflix_image = Image.open("netflix.png")  # Ensure this image is in your project folder
st.image(netflix_image, caption="Netflix Movie Analysis", width=400)

# Skills Section
st.markdown("<a id='skills'></a>", unsafe_allow_html=True)
st.subheader("Technical Skills")
st.markdown("""
- **Programming:** Python, SQL, R, C++
- **Data Analysis:** Pandas, NumPy, Matplotlib, Seaborn, Power BI, Excel
- **Machine Learning:** Scikit-Learn, TensorFlow, Keras, PyTorch
- **Databases:** MySQL, PostgreSQL, MongoDB
- **Big Data:** PySpark, ETL Development
- **Tools:** Git, Jupyter, Agile, Data Visualization
""")

# Contact Section
st.markdown("<a id='contact'></a>", unsafe_allow_html=True)
st.subheader("Contact Me")
contact_form = """
<form action="https://formsubmit.co/omimucet@gmail.com" method="POST">
  <input type="text" name="name" placeholder="Your Name" required><br>
  <input type="email" name="email" placeholder="Your Email" required><br>
  <textarea name="message" placeholder="Your Message" required></textarea><br>
  <button type="submit">Send Message</button>
</form>
"""
st.markdown(contact_form, unsafe_allow_html=True)

# Footer Section
st.markdown("""<br><br>
#### © 2024 Om Prakash. All Rights Reserved.
""")
