Aide is a powerful and versatile web extension designed to enhance your browsing experience by integrating a sophisticated AI-powered SideKick and an intuitive Web UI. This innovative tool allows you to seamlessly interact with your local AI language models (LLMs) and perform a wide range of actions directly from any webpage or browser tab.

With Aide, you can tap into the power of multimodal capabilities, enabling you to process and generate text, images, and more. Its advanced web scraping feature, powered by Cheerio, allows you to fetch real-time actionable data from the web, ensuring you always have the most up-to-date information at your fingertips.

Additionally, Aide leverages Google search to provide real-time data, allowing you to effortlessly gather and utilize information from the internet. Whether you're researching, managing tasks, or simply browsing, Aide transforms the way you interact with online content, making your workflow more efficient and productive.

## Real-World Benefits

- **Privacy**: By running AI models locally, Aide ensures that your sensitive data never leaves your device, providing a higher level of privacy compared to cloud-based solutions.

- **Speed**: Local execution of AI models results in faster processing times, as there’s no need to wait for data to travel to and from a remote server.

- **Customization**: Running AI models on your machine allows for greater customization. You can fine-tune models to better match your specific needs and preferences, enhancing their effectiveness and relevance.

Aide is perfect for researchers, professionals, and anyone who values privacy, speed, and customization in their AI tools. It helps you gather and use information more effectively, making your online activities smoother and more productive. With Aide, you can leverage the power of AI directly in your browser, enhancing your ability to interact with and utilize online content.


## Installation 

### Prerequisites

- **Node.js** (v18 or higher) - [Installation Guide](https://nodejs.org/)
- **npm** (Node Package Manager)
- **Ollama** (Local AI Provider) - [Installation Guide](link_to_ollama_installation_guide)

### Clone the Repository

```bash
git clone https://github.com/somritdasgupta/aide.git
cd aide
```

### Install Dependencies

```bash
npm install
```

### Build the Extension

#### For Chrome

```bash
npm run build
```

#### For Firefox

```bash
npm run build:firefox
```

## Load the Extension

### For Chrome

1. Open the Extension Management page by navigating to `chrome://extensions`.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the `Load unpacked` button and select the `build` directory.

### For Firefox

1. Open Firefox and navigate to `about:addons`.
2. Click on the Extensions tab.
3. Click "Manage Your Extensions".
4. Click "Load Temporary Add-on" and select the `manifest.json` file from the `build` directory.

## Usage

### Sidebar

Once the extension is installed, you can open the sidebar via the context menu or using the keyboard shortcut:

- **Default Keyboard Shortcut**: `Ctrl+Shift+P`

### Web UI

You can open the Web UI by clicking on the extension icon which will open a new tab with the Web UI:

- **Default Keyboard Shortcut**: `Ctrl+Shift+L`

Note: You can customize keyboard shortcuts from the extension settings on the Chrome Extension Management page.

## Features

- **SideKick**: Interact with aiDe directly from any webpage or tab.
- **Web UI**: Use a full-fledged web interface to communicate with your model.
- **Chat With Webpage**: Engage with the webpage content through interactive conversations.

## Tech Stack

- **Language**: TSX (TypeScript)
- **Core Architecture**: React, Node.js
- **Storage**: Local Storage (Context API + Zustand)
- **State Management**: Zustand
- **Web Scraping**: Cheerio
- **API Management**: Axios
- **UI Boilerplate**: TailwindCSS and Ant Design

## Overview

Aide leverages transformer-based architectures to enhance natural language processing capabilities:

### Transformers

- **Architecture Overview**: Transformers use attention mechanisms to process sequential data, optimizing text analysis and response generation.
- **Integration with GPT Models**: Aide integrates with pre-trained models like GPT from OpenAI for accurate and context-aware interactions.

### Web Scraping with Cheerio

- **Description**: Cheerio is used to provide web scraping functionality within Aide, enabling the extension to extract and interact with content from web pages.
- **Usage**: Cheerio parses the HTML of web pages, allowing Aide to manipulate and extract information efficiently.

## Fine-Tuning and Customization

Aide allows fine-tuning of its AI models using the following parameters to customize behavior and outputs:

### Fine-Tuning Parameters that can be used to customise the response from the model.

#### 1. Temperature

- **Description**: Controls the randomness of the model's outputs.
- **Range**: Typically ranges from 0 to 1.
- **Constraint**: 
  - A value of 0 results in deterministic outputs, always choosing the most probable token.
  - Higher values introduce more randomness, leading to more diverse but potentially less accurate outputs.

#### 2. Top K

- **Description**: Limits the number of possible next words the model considers at each step.
- **Range**: Integer value, typically set between 1 and the vocabulary size.
- **Constraint**: 
  - Setting a lower value ensures the model only considers the most probable tokens, improving output stability.
  - Higher values increase diversity but may introduce less common or less relevant tokens.

#### 3. Top P (Nucleus Sampling)

- **Description**: Limits the probability distribution over possible words.
- **Range**: Typically a probability value between 0 and 1.
- **Constraint**: 
  - Lower values restrict the token sampling to the most likely choices, ensuring safer and more predictable outputs.
  - Higher values allow for a wider range of token choices, potentially including more creative or less probable outputs.

#### 4. Num Context

- **Description**: Specifies the number of previous conversation exchanges considered.
- **Range**: Integer value, indicating the depth of context considered.
- **Constraint**: 
  - Higher values provide more context to the model, potentially improving coherence and relevance in conversational interactions.
  - However, increasing Num Context can also increase computational load and response latency.

#### 5. Seed

- **Description**: Random number used to initialize the model's internal state.
- **Range**: Any integer value.
- **Constraint**: 
  - Using the same seed ensures deterministic outputs for the same input, facilitating reproducibility and debugging.
  - Different seeds generate different outputs even for the same input, useful for exploring diverse responses or creative applications.

## How to Use Effectively

- **Factual Accuracy**: Use a lower Temperature and adjust Top K and Top P to prioritize safe, predictable outputs.
- **Creativity**: Increase Temperature for more diverse and creative outputs, while adjusting Top K and Top P to balance novelty with relevance.
- **Conversational Contexts**: Increase Num Context to maintain coherence and relevance across multiple exchanges.
- **Consistency vs. Variability**: Use Seed to control the variability of outputs, ensuring consistency or exploring diverse responses based on application needs.

---