# Aide

Aide is an open-source Chrome Extension that integrates a Sidebar and Web UI for your local AI model, allowing seamless interaction from any webpage.

## Installation

### Prerequisites

- Node.js (v18 or higher) - [Installation Guide](https://nodejs.org/)
- npm (Node Package Manager)
- Ollama (Local AI Provider) - [Installation Guide](link_to_ollama_installation_guide)

### Clone the repository

```bash
git clone https://github.com/somritdasgupta/aide.git
cd aide
```

### Install dependencies

```bash
npm install
```

### Build the extension for Chrome

```bash
npm run build
```

## Load the extension (Firefox)

1. Open Firefox and navigate to `about:addons`.
2. Click on the Extensions tab.
3. Click "Manage Your Extensions".
4. Click "Load Temporary Add-on" and select the `manifest.json` file from the `build` directory.

## Usage

### Sidebar

Open the sidebar via context menu or using the keyboard shortcut:

- Default Keyboard Shortcut: Ctrl+Shift+P

### Web UI

Open the Web UI by clicking on the extension icon:

- Default Keyboard Shortcut: Ctrl+Shift+L

Note: You can customize keyboard shortcuts from the Chrome Extension Management page.

## Features

- **Sidebar**: Interact with your AI model directly from any webpage.
- **Web UI**: Use a full-fledged web interface to communicate with your model.
- **Chat With Webpage**: Engage with the webpage content through interactive conversations.

## Tech Stack

- **Language**: TSX (TypeScript)
- **Core Architecture**: React, Node.js
- **Storage**: Local Storage (Context API + Zustand)
- **State Management**: Zustand
- **API Management**: Axios
- **UI Boilerplate**: TailwindCSS and Ant Design

## Overview

Aide leverages transformer-based architectures to enhance natural language processing capabilities:

### Transformers

- **Architecture Overview**: Transformers use attention mechanisms to process sequential data, optimizing text analysis and response generation.
- **Integration with GPT Models**: Aide integrates with pre-trained models like GPT from OpenAI for accurate and context-aware interactions.

# Fine-Tuning and Customization

Aide allows fine-tuning of its AI models using the following parameters to customize behavior and outputs:

## Fine-Tuning Parameters

### 1. Temperature

- **Description**: Controls the randomness of the model's outputs.
- **Range**: Typically ranges from 0 to 1.
- **Constraint**: 
  - A value of 0 results in deterministic outputs, always choosing the most probable token.
  - Higher values introduce more randomness, leading to more diverse but potentially less accurate outputs.

### 2. Top K

- **Description**: Limits the number of possible next words the model considers at each step.
- **Range**: Integer value, typically set between 1 and the vocabulary size.
- **Constraint**: 
  - Setting a lower value ensures the model only considers the most probable tokens, improving output stability.
  - Higher values increase diversity but may introduce less common or less relevant tokens.

### 3. Top P (Nucleus Sampling)

- **Description**: Limits the probability distribution over possible words.
- **Range**: Typically a probability value between 0 and 1.
- **Constraint**: 
  - Lower values restrict the token sampling to the most likely choices, ensuring safer and more predictable outputs.
  - Higher values allow for a wider range of token choices, potentially including more creative or less probable outputs.

### 4. Num Context

- **Description**: Specifies the number of previous conversation exchanges considered.
- **Range**: Integer value, indicating the depth of context considered.
- **Constraint**: 
  - Higher values provide more context to the model, potentially improving coherence and relevance in conversational interactions.
  - However, increasing Num Context can also increase computational load and response latency.

### 5. Seed

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

