// Every project on the page comes from this list, in this order. Main projects
// need a `details` object for their Read more panel; TypeScript stops the build
// if one is missing, and also if a smaller project is given one by mistake.
//
// Text can mark its key words with double asterisks, as in Markdown:
// 'I trained the **clustering model**'. The page shows those words heavier and
// darker, so a reader skimming it picks them out first. Mark the results and
// the parts I built, not the team's.
//
// A technical term in double square brackets, like '[[CI/CD]]', gets a short
// plain-language explanation that shows when a visitor taps or points at it.
// The explanations live in glossary.ts; a term that isn't there shows as plain text.

// One bar in a comparison chart. valueLabel is what the reader sees at the end of
// the bar, so it carries the unit; note adds a second fact under the bar.
export type Bar = {
  label: string
  value: number
  valueLabel: string
  note?: string
  // The bar the chart is about, drawn darker than the rest.
  emphasis?: boolean
}

// A step in a how-it-works diagram. mine marks the parts I built myself.
export type FlowStep = {
  label: string
  mine: boolean
}

// A screenshot. width and height are the file's real size in pixels, which lets
// the browser reserve the space before the image arrives.
export type ImageVisual = {
  type: 'image'
  src: string
  alt: string
  width: number
  height: number
  // A short line under the visual. Leave it out when the visual explains itself.
  caption?: string
}

// A small bar chart of real results. The headings describe the bars and the notes.
export type BarsVisual = {
  type: 'bars'
  labelHeading: string
  valueHeading: string
  noteHeading?: string
  // The value at the right-hand end of the scale, so bars keep their proportions.
  scaleMax: number
  bars: Bar[]
  // A short line under the visual. Leave it out when the visual explains itself.
  caption?: string
}

// Steps from start to finish, with my parts marked.
export type FlowVisual = {
  type: 'flow'
  steps: FlowStep[]
  // A short line under the visual. Leave it out when the visual explains itself.
  caption?: string
}

// One starting point that splits into parallel questions, with an optional last step.
export type BranchesVisual = {
  type: 'branches'
  source: string
  branches: string[]
  then?: string
  // A short line under the visual. Leave it out when the visual explains itself.
  caption?: string
}

// A short silent recording that loops, such as a simulation run, as a WebM and
// an MP4 video (browsers use the first they can play). still is one frame of it
// as an image: it shows until the video loads, and instead of it for visitors
// who asked their device for less motion. width and height are the video's size.
export type AnimationVisual = {
  type: 'animation'
  webm: string
  mp4: string
  still: string
  alt: string
  width: number
  height: number
  // A short line under the visual. Leave it out when the visual explains itself.
  caption?: string
}

// What leads a project: a screenshot or recording of the real work, a chart of
// real numbers, or a diagram of how it works. type tells the shapes apart, like
// kind does for projects. A logo is never a project's visual: it names the
// client, it isn't evidence of the work.
export type ProjectVisual = ImageVisual | AnimationVisual | BarsVisual | FlowVisual | BranchesVisual

// A client's logo, shown small beside the client's name in the ink colour (see
// ClientLogo.tsx). Only the file's shape is used, so it needs a transparent
// background. width and height give its proportions.
export type Logo = {
  src: string
  width: number
  height: number
}

// One picture or video in a project page's gallery. The first one leads the
// page, large, under its header; the others form the gallery further down, and
// the larger view steps through all of them. width and height are the file's
// real size, so the browser can keep the space before it arrives.
export type GalleryImage = {
  kind: 'image'
  src: string
  alt: string
  width: number
  height: number
  caption: string
}

export type GalleryVideo = {
  kind: 'video'
  webm: string
  mp4: string
  // A frame of the video, shown until it plays and as its thumbnail.
  poster: string
  alt: string
  width: number
  height: number
  caption: string
}

export type GalleryItem = GalleryImage | GalleryVideo

// A main project with a page of its own. Its address is /projects/ plus the
// slug, and each slug needs a matching HTML file in the projects folder at the
// top of the repository (see README).
export type ProjectPage = {
  slug: string
  gallery: GalleryItem[]
}

// The areas a project belongs to, shown as tags on it. A project can be in more than one.
export type Category = 'ml' | 'data' | 'software'

export const categoryLabels: Record<Category, string> = {
  ml: 'ML engineering',
  data: 'Data',
  software: 'Software',
}

// These facts apply to every project.
type ProjectBase = {
  // The id is used in the page's HTML ids, so keep it lowercase with dashes.
  id: string
  title: string
  // The short text on the card. Keep it to two or three sentences.
  summary: string
  client?: string
  period: string
  // This lists only skills I used myself, so group projects never imply that teammates' work is mine.
  skills: string[]
  // The one result a reader should remember, shown highlighted under the title.
  // Keep it short and lead with the number where there is one, marked **bold**.
  keyResult: string
  visual: ProjectVisual
  // The project's public code on GitHub. The card shows a View code link to it.
  codeUrl?: string
  // The areas this project belongs to, shown as tags on its card.
  categories: Category[]
}

// These are the four parts of a main project's Read more panel.
export type ProjectDetails = {
  problem: string
  built: string[]
  // Group projects describe what teammates built here.
  teamBuilt?: string
  // The steps are listed in the order the system runs them.
  howItWorks: string[]
  result: string[]
}

export type MainProject = ProjectBase & {
  kind: 'main'
  team: string
  role?: string
  details: ProjectDetails
  // A project with a page opens it from a card; one without opens Read more.
  page?: ProjectPage
}

export type SmallProject = ProjectBase & {
  kind: 'small'
  // More detail behind the card's Read more button, so the card itself stays short.
  more?: string
}

// `kind` tells the two shapes apart, so code that checks it knows which fields exist.
export type Project = MainProject | SmallProject

// My public repositories all live under one GitHub account.
const repo = (name: string) => `https://github.com/AbdelrahmanSamara245769/${name}`

// The clients' logos, from their own websites: NPEC's plant symbol (its site
// icon) and Content Intelligence Agency's mark. The keys are the client names
// exactly as the projects below write them.
export const clientLogos: Record<string, Logo> = {
  NPEC: { src: '/logos/npec-symbol.png', width: 197, height: 263 },
  'Content Intelligence Agency': { src: '/logos/cia-mark.svg', width: 724, height: 391 },
}

// The address of a project's page.
export const projectUrl = (page: ProjectPage) => `/projects/${page.slug}`

// The two NPEC projects are one story: the root detection prototype grew into the
// production platform. The page shows them first, together and in this order,
// joined by a line, with the `link` sentence where one becomes the other.
// The ids must match two main projects below.
export const npecStory = {
  // Screen readers announce this as the name of the two-part list.
  label: 'From prototype to production, for NPEC',
  prototypeId: 'root-detection-robot',
  productionId: 'plant-root-platform',
  link: 'I then turned its image pipeline into a **tested Python package**, the core of the production platform.',
}

export const projects: Project[] = [
  {
    kind: 'main',
    id: 'root-detection-robot',
    title: 'Root Detection and Robotic Inoculation System',
    summary:
      'An end-to-end system that finds plant root tips in petri dish images and guides a simulated lab robot to inoculate them.',
    client: 'NPEC',
    team: 'Solo',
    period: 'November 2025 to January 2026',
    skills: ['TensorFlow/Keras', 'OpenCV', 'PyBullet', 'Gymnasium', 'Stable-Baselines3'],
    keyResult: '**15 of 15** root tips within 1 mm',
    codeUrl: repo('root-detection-robotics'),
    categories: ['ml', 'software'],
    visual: {
      type: 'animation',
      webm: '/projects/root-detection/robot-inoculation.webm',
      mp4: '/projects/root-detection/robot-inoculation.mp4',
      still: '/projects/root-detection/robot-inoculation-still.webp',
      alt: 'A simulated pipette robot moving over a petri dish and dropping a red droplet on each root tip in turn.',
      width: 960,
      height: 720,
      caption: 'The simulated robot inoculating the root tips on one of the three test dishes.',
    },
    page: {
      slug: 'root-detection',
      gallery: [
        {
          kind: 'video',
          webm: '/projects/root-detection/robot-inoculation.webm',
          mp4: '/projects/root-detection/robot-inoculation.mp4',
          poster: '/projects/root-detection/robot-inoculation-still.webp',
          alt: 'A simulated pipette robot moving over a petri dish and dropping a red droplet on each root tip in turn.',
          width: 960,
          height: 720,
          caption: 'The simulated robot inoculating the five root tips on one of the three test dishes, steered by the PID controller.',
        },
        {
          kind: 'image',
          src: '/projects/root-detection/overlay.webp',
          alt: 'A petri dish of three seedlings with the roots the model found drawn over them in red.',
          width: 1159,
          height: 1159,
          caption: 'The roots my U-Net found, drawn in red over a test dish.',
        },
        {
          kind: 'image',
          src: '/projects/root-detection/before-after.webp',
          alt: 'On the left, a petri dish of three seedlings; on the right, the same root systems as a white mask on black.',
          width: 1600,
          height: 784,
          caption: 'A cropped dish, and the root system the model predicts from it.',
        },
        {
          kind: 'image',
          src: '/projects/root-detection/root-tips.webp',
          alt: 'Five lanes, one per plant, each showing the main root traced in red and its tip circled in green, with the tip’s pixel position above.',
          width: 1600,
          height: 671,
          caption: 'The dish in the recording: each plant’s main root, and the tip the robot was sent to.',
        },
      ],
    },
    details: {
      problem:
        'NPEC wanted root tip inoculation automated: find every root tip in an image of a petri dish, then steer a pipette robot to drop inoculum on each one, with a positioning target of 1 mm.',
      built: [
        'Computer vision: a **Residual Attention U-Net** trained on image patches with a mix of binary cross-entropy and focal Tversky loss, and a pipeline that finds the dish, segments the roots and locates each root tip.',
        'Root length: measured each plant’s **main root length** from raw images for a Kaggle competition.',
        'Robot workspace: **mapped the reachable workspace** of a simulated Opentrons OT-2 pipette robot in PyBullet by driving each axis until it stopped moving.',
        '[[PID control]]: **one PID controller per axis**, with an integral term only on the vertical axis to counter gravity.',
        'Reinforcement learning: a **custom Gymnasium environment** around the robot and a **PPO agent** from Stable-Baselines3, trained for about 3 million steps.',
        'Integration: **connected the vision pipeline to the robot** in two versions, one driven by the PID controller and one by the RL agent, with telemetry and benchmarking that record every run and plot the comparison.',
      ],
      howItWorks: [
        'The pipeline crops the petri dish out of the full image.',
        'The U-Net segments the roots.',
        'The pipeline splits the dish into one lane per plant and traces the roots in each lane to find each tip’s position in pixels.',
        'It converts each position to millimetres, using the 150 mm dish as the scale, and then to robot coordinates, whose axes are rotated 90 degrees from the image.',
        'The PID controller moves the pipette over the tip and drops the inoculum.',
      ],
      result: [
        'The segmentation model reached a validation **F1 score of 0.88**.',
        'Ranked **5th of 77** on the private Kaggle leaderboard for main root length accuracy, with an average error of 5.75% ([[sMAPE]]).',
        'Tested on their own, the PID controller reached **0.9 mm** on a single target and the RL agent averaged 2.88 mm over 20 random targets.',
        'In the full system, the PID version hit **15 of 15 root tips** in about 64 seconds per dish, with a mean error of 0.90 mm and a maximum of 1.00 mm. The RL version hit 0 of 5.',
      ],
    },
  },
  {
    kind: 'main',
    id: 'plant-root-platform',
    title: 'Plant Root Analysis Platform',
    summary:
      'I led the team as **scrum master**, built the **training pipeline** and set up [[CI/CD]].',
    client: 'NPEC',
    team: '5 people',
    role: 'Scrum master',
    period: 'April to June 2026',
    skills: ['Azure ML', 'MLflow', 'GitHub Actions', 'TensorFlow/Keras', 'Python packaging'],
    keyResult: 'Deployed to Azure and on premise',
    codeUrl: repo('plant-root-analysis-platform'),
    categories: ['ml', 'software'],
    visual: {
      type: 'image',
      src: '/projects/plant-root-analysis-platform/app.webp',
      alt: 'The prediction view of the web app: an NPEC petri dish scan with four root tips circled and numbered by lane, a list of each tip’s position and confidence, and below it a feedback form where a user can confirm or correct each tip.',
      width: 1100,
      height: 1316,
      caption: 'The team’s deployed web app, showing the root tips my image pipeline found in an NPEC scan, with the feedback form that feeds retraining.',
    },
    page: {
      slug: 'plant-root-analysis-platform',
      gallery: [
        {
          kind: 'image',
          src: '/projects/plant-root-analysis-platform/app.webp',
          alt: 'The prediction view of the web app: an NPEC petri dish scan with four root tips circled and numbered by lane, a list of each tip’s position and confidence, and below it a feedback form where a user can confirm or correct each tip.',
          width: 1100,
          height: 1316,
          caption: 'The team’s deployed web app, showing the root tips my image pipeline found in an NPEC scan, with the feedback form that feeds retraining.',
        },
        {
          kind: 'image',
          src: '/projects/plant-root-analysis-platform/training-pipeline.webp',
          alt: 'An Azure Machine Learning pipeline graph: two data inputs feed a preprocess step, then train, evaluate and register steps, which output the prepared data, the trained model, metrics, overlays and a registration decision.',
          width: 848,
          height: 786,
          caption: 'The training pipeline I built in Azure ML: preprocess, train, evaluate and register, each a separate component.',
        },
        {
          kind: 'image',
          src: '/projects/plant-root-analysis-platform/sweep.webp',
          alt: 'A parallel coordinates chart with one line per trial, crossing axes for learning rate, batch size, augmentation strength and validation F1.',
          width: 706,
          height: 428,
          caption: 'A hyperparameter sweep in Azure ML: each line is one trial’s learning rate, batch size and augmentation strength, compared by validation F1.',
        },
        {
          kind: 'image',
          src: '/projects/plant-root-analysis-platform/tests.webp',
          alt: 'A GitHub Actions summary with the lint and test jobs passing, beside a unit test report that lists each test file and totals 242 passed tests.',
          width: 912,
          height: 568,
          caption: 'The report my CI posts on every pull request: lint and tests passing, 242 tests in all.',
        },
      ],
    },
    details: {
      problem:
        'NPEC, the Netherlands Plant Eco-phenotyping Centre, scans petri dishes of seedlings and needs to know where each plant’s main root ends. A model from my earlier root detection project already found those root tips, but only as research code. To be useful day to day, it had to run as a service, be tested before every release and keep improving as new scans and corrections come in.',
      built: [
        'Led the team as **scrum master**, managed the Gitflow branching strategy and ran the review and merge process for **more than 30 pull requests**.',
        'Wrote the **training code**: the model, loss functions, metrics, data loading, training, evaluation, conditional model registration and [[MLflow]] experiment tracking.',
        'Built the **automated training pipeline in Azure ML**: four components (data preparation, training, evaluation and model registration), their environments and the submission scripts. I validated each component on its own before running the whole pipeline.',
        'Automated **hyperparameter sweeps** over learning rate, batch size and augmentation. Each sweep evaluates every candidate and registers the best model.',
        'Built a **data pipeline** that registers the prepared images as a versioned data asset in Azure ML.',
        'Set up **CI/CD in GitHub Actions**: linting, tests and coverage reports on every pull request, deployment to Azure Container Apps and to the on-premise server, and a [[canary rollout]] script so new versions roll out gradually.',
        'Turned the image pipeline from my earlier root detection project into a **Python package** with unit and integration tests.',
        'Found and fixed a **mask normalisation bug** that had the model training on blank labels. Also fixed a **data streaming bottleneck** in the cloud pipeline.',
      ],
      teamBuilt:
        'My teammates mainly built the rest of the app: the FastAPI backend, the web frontend and dashboard, the Docker setup, the monitoring and drift jobs, and the Airflow workflow.',
      howItWorks: [
        'A user uploads a petri dish scan in the web app.',
        'The image pipeline crops the dish and runs a Residual Attention U-Net over it in overlapping 256-pixel patches.',
        'It cleans up the mask, splits the dish into five lanes, one per plant, and traces each main root along its skeleton to the tip.',
        'The API returns each tip’s position in pixels and millimetres, with a confidence score. The model runs either inside the API or on an Azure ML endpoint.',
        'The app saves predictions and user corrections in PostgreSQL. A daily job checks the confidence scores for drift, and new data feeds the training pipeline, which trains and evaluates a new model and registers it only when it passes evaluation.',
      ],
      result: [
        'A working web app built for NPEC, deployed to **Azure** and to an **on-premise server**, with **automated retraining**.',
        'The training pipeline and hyperparameter sweeps turn prepared data into an evaluated, registered model, and CI/CD tests every change before release. I focused on building this automation rather than on raising the model’s score.',
      ],
    },
  },
  {
    kind: 'main',
    id: 'emotion-pipeline',
    title: 'Emotion Detection Pipeline for TV Content',
    summary:
      'I chose the **speech-to-text service**, trained an **English-to-Dutch translation model from scratch** ([[BLEU]] 34.7) and tested **LLM prompting** as an emotion classifier.',
    client: 'Content Intelligence Agency',
    team: '3 people',
    period: 'September to October 2025',
    skills: ['AssemblyAI', 'Whisper', 'machine translation', 'LLM prompting', 'NLP feature extraction'],
    keyResult: '**0.63** [[macro F1]] for the team’s RoBERTa-Large model',
    codeUrl: repo('tv-emotion-detection'),
    categories: ['ml', 'data'],
    visual: {
      type: 'flow',
      steps: [
        { label: 'AssemblyAI transcribes the episode', mine: true },
        { label: 'Translation model: English to Dutch and back', mine: true },
        { label: 'RoBERTa-Large labels each sentence’s emotion', mine: false },
        { label: 'Transcript with an emotion on every sentence', mine: false },
      ],
    },
    details: {
      problem:
        'Content Intelligence Agency wanted to see which emotions come up in TV dialogue, sentence by sentence. That means turning video into text, translating it, and sorting every sentence into one of seven emotions: happiness, sadness, anger, surprise, fear, disgust or neutral.',
      built: [
        'Compared **AssemblyAI and Whisper** by word error rate, counting the errors by hand, to choose the speech-to-text service.',
        'Trained an **English-to-Dutch translation model from scratch**, which runs in the translation step of the final pipeline.',
        'Ran three rounds of **prompt engineering** to test a large language model as an emotion classifier.',
        'Built the **NLP feature extraction** and the **data quality report**.',
      ],
      teamBuilt:
        'The team trained and compared the emotion classifiers, from logistic regression, Naive Bayes and SVMs through RNNs and LSTMs to transformers such as BERT, RoBERTa and DeBERTa. They also did the error analysis and the explainability work, and wrote the model card.',
      howItWorks: [
        'AssemblyAI transcribes the episode.',
        'My translation model translates the English transcript into Dutch, and the pipeline then translates the Dutch back into English for the emotion classifier.',
        'A fine-tuned RoBERTa-Large model, trained with a class-weighted loss, labels each sentence with one of the seven emotions.',
        'The output is the transcript with an emotion label on every sentence.',
      ],
      result: [
        'The team’s final model, RoBERTa-Large with class weighting, reached 0.632 macro F1 and 0.693 accuracy on the test set. The best traditional model, an SVM, reached 0.29 macro F1.',
        'My translation model scored **BLEU 34.7** and **chrF 52.1** on the full evaluation set.',
      ],
    },
  },
  {
    kind: 'main',
    id: 'stock-chatbot',
    title: 'AI Stock Market Chatbot',
    summary:
      'I trained the **clustering model** that sorts the companies into three risk groups and the **classifier that predicts six-month price movement**, and wrote the **SQL** that builds its PostgreSQL database.',
    team: '4 people',
    period: 'May to June 2025',
    skills: ['scikit-learn', 'XGBoost', 'PostgreSQL', 'SQL', 'Poetry'],
    keyResult: 'A working proof of concept for beginner investors',
    codeUrl: repo('stock-market-chatbot'),
    categories: ['data', 'software'],
    visual: {
      type: 'flow',
      steps: [
        { label: 'SQL scripts build the database', mine: true },
        { label: 'K-means sorts companies into three risk groups', mine: true },
        { label: 'XGBoost predicts six-month price movement', mine: true },
        { label: 'LLM agent turns questions into SQL', mine: false },
        { label: 'Gradio chat shows the answer', mine: false },
      ],
    },
    details: {
      problem:
        'The goal was a chatbot for beginner investors: group the NASDAQ-100 companies by risk, predict how their prices will move, and answer questions in plain language.',
      built: [
        'Trained a **K-means** model that sorts the companies into **three risk groups**, based on return, volatility and volume statistics.',
        'Trained an **XGBoost classifier** that predicts six-month price movement in five classes, from Very High (a rise of 30% or more) to Very Low (a fall of more than 20%), using technical indicators such as moving averages, RSI and Bollinger bands, plus the Sharpe ratio.',
        'Wrote the **SQL scripts** that create and fill the PostgreSQL database behind the chatbot.',
        'With a teammate, restructured the codebase into a modular **Python package** managed with Poetry.',
      ],
      teamBuilt:
        'The team built the chatbot itself: a Gradio interface and a LangChain and LangGraph agent that uses Mistral Small 22B, served through Ollama, to turn a question into SQL, run the query and phrase the answer. The team also wrote tests, documentation and exploratory analyses of oil, gold, exchange rates and macroeconomic indicators.',
      howItWorks: [
        'Market data lives in a PostgreSQL data warehouse.',
        'The clustering model sorts the companies into three risk groups and picks out the safest ones.',
        'The XGBoost classifier predicts their price movement, and the pipeline writes the predictions back to the database.',
        'When someone asks a question, the LLM agent turns it into SQL, runs the query and phrases the answer.',
        'The answer appears in the Gradio chat interface.',
      ],
      result: [
        'A working proof of concept: a beginner can ask about NASDAQ-100 stocks in plain language and get answers based on the risk groups and price predictions in the database.',
      ],
    },
  },
  {
    kind: 'small',
    id: 'hospital-diabetes-models',
    title: 'Hospital stay and diabetes medication prediction',
    summary:
      'Using the public Diabetes 130-US Hospitals dataset, I built and compared **regression** models to predict how long patients stay in hospital, **classification** models to predict whether diabetes medication is prescribed, and **clustering** models to group similar patients.',
    more: 'I also implemented **regularised linear and logistic regression from scratch** in NumPy, trained by vectorised gradient descent. I tuned the models with **grid search and nested cross-validation**.',
    period: 'November 2024 to January 2025',
    skills: ['scikit-learn', 'XGBoost', 'pandas', 'NumPy', 'SQL'],
    keyResult: '**3** kinds of model, plus gradient descent from scratch',
    codeUrl: repo('diabetes-hospital-ml'),
    categories: ['data'],
    visual: {
      type: 'branches',
      source: 'Diabetes 130-US Hospitals records',
      branches: [
        'Regression: how long a patient stays',
        'Classification: is diabetes medication prescribed?',
        'Clustering: groups of similar patients',
      ],
    },
  },
  {
    kind: 'small',
    id: 'waste-classification',
    title: 'Responsible image classification app',
    summary:
      'A deep learning classifier that sorts photos of waste into four classes: PMD (plastic, metal and drink cartons), paper and cardboard, organic, and general waste. I assembled the dataset and built the model in four iterations, from a custom CNN to **transfer learning**.',
    more: 'I used **Grad-CAM** to show which parts of an image drove its predictions. I also designed and user-tested a **Figma prototype**: you photograph your waste and the app tells you which bin it goes in. Separately, I checked the imSitu image dataset for **representational bias**.',
    period: 'February to April 2025',
    skills: ['TensorFlow/Keras', 'CNNs', 'Grad-CAM', 'Figma'],
    keyResult: 'Explained with [[Grad-CAM]] and tested with users',
    codeUrl: repo('waste-sorting-classifier'),
    categories: ['ml'],
    visual: {
      type: 'flow',
      steps: [
        { label: 'Photograph the waste', mine: true },
        { label: 'CNN predicts the category', mine: true },
        { label: 'Prototype shows the right bin', mine: true },
      ],
    },
  },
  {
    kind: 'small',
    id: 'research-study',
    title: 'Quantitative research study',
    summary:
      'I tested whether multi-class segmentation finds the root–shoot junction better than a binary model. Its root length measurements were less accurate than the binary model’s.',
    more: 'I reviewed the literature, ran the experiments and compared the two models with **statistical hypothesis tests**.',
    period: 'February to April 2026',
    skills: ['research design', 'hypothesis testing', 'image segmentation'],
    keyResult: 'Fewer junction errors, though not statistically significant (p = 0.29)',
    codeUrl: repo('root-shoot-junction-segmentation'),
    categories: ['ml', 'data'],
    visual: {
      type: 'branches',
      source: 'The same plant images, labelled two ways',
      branches: ['Binary: root or background', 'Multi-class: background, shoot, root or seed'],
      then: 'Compared with statistical hypothesis tests',
    },
  },
]
