# Life Line - Emergency Response and AI Doctor App
Life Line is a reliable emergency response app designed to provide quick and effective assistance during critical situations. The app uses Google's Gemini API to provide users with AI assisted emergency response, aid and Diagnosis through an experimental AI doctor feature.

![Life Line Poster](./screenshots/poster.png)

## Introduction and Inspiration

The medical care system in a developing nation like India is severely overburdened, with a doctor-to-patient ratio far below the World Health Organization's recommended standard. Emergency response times are often slow, particularly in rural areas, where the average response time can exceed 30 minutes. Doctors are overstressed, frequently dealing with an overwhelming influx of patients that prevents them from giving each patient the proper time and attention needed for effective care. According to a 2020 report, India had just one doctor for every 1,457 people, well below the WHO's recommendation of one doctor per 1,000 people.

I have personally experienced the shortcomings of this system. In a critical situation, the delayed emergency response and the rushed consultations made it evident that something needed to change. This experience inspired me to build Life Line, a solution aimed at improving emergency response times and providing preliminary medical assistance to alleviate the pressure on healthcare professionals. With AI based emergency dispatcher and an AI Doctor for diagnosis and preliminary assesment, Lifeline is a complete solution to provide healthcare to those who cant access it.


## Features

- **Quick Access to Emergency Services**: Connects users to emergency services instantly using Gemini API.
- **AI Assited Diagnosis**: Experimental AI doctor feature revolutionize healthcare by providing accurate and quick diagnosis to patients who may not have access to proper healthcare.
- **Regional Language Voice Input**: All these features can be used using voice commands and inputs. And these inputs are available in regional languages (Hindi) for easier access of masses.

## AI Doctor
The AI Doctor feature in Life Line is designed to assist users with medical inquiries and provide preliminary diagnosis based on symptoms.

### Features and Capabilities
- **Symptom Checker:** Users can input their symptoms and receive possible diagnoses and advice.
- **Reports and Imaging :** Users can upload their medical scans or reports to the ai for it to make a diagnosis
- **Results and Treatment Plan:** The AI conducts through assestment and provides a detailed diagnosis with reasoning and treatment plan and medications and also provides referals to senior consultants.


### Real World Testing and Validation
- **Disease Testing:** The AI Doctor has been tested on a wide range of diseases to ensure accuracy and reliability.
- **Collaboration with Real Doctors:** We've collaborated with medical professionals to validate the AI's recommendations and improve its diagnostic capabilities.

## Installation

Follow these steps to install and run the Life Line app locally:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Decodam/lifeline.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd lifeline-app
    ```

3. **Install the dependencies**:
    ```sh
    npm install
    ```

3. **Add Gemini API Key to a .env file**:
    ```.env
    REACT_APP_GEN_AI_KEY=YOURAPIKEY
    ```

4. **Run the app**:
    ```sh
    npm start
    ```

The app will be available at `http://localhost:3000`.

## Usage

- **Accessing Emergency Services**: Click on the emergency button to connect with local emergency services.
- **Accessing AI Doctor**: Click on the AI Diagnosis button to connect with AI Doctor.
- **Uploading Reports**: Click on the attachment button on the AI doctor Screen to upload medical imaging or reports.


## Screenshots

![Life Line LandingPage](./screenshots/landing.png)

## Core Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For designing the website with faster workflow.
- **Redux**: For state managment and navigation.
- **Google Gemini API**: For generative ai responses.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or suggestions, feel free to reach out to me at <a href="arghya-mondal-work.netlify.app">my website</a>

---

Thank you for using Life Line. Lets save lives!