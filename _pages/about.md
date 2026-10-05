---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

I am a Master's student in Computer Science at Brown University (2025–2027), working on **physiological foundation models** and **multimodal representation learning**. My research focuses on learning generalizable representations from EEG and other physiological signals — from cross-cohort depression biomarkers to zero-shot multimodal adaptation of EEG foundation models.

I am currently a visiting student researcher in the Department of Psychiatry and Behavioral Sciences at Stanford University School of Medicine (with Prof. Yu Zhang), and a research intern at Stanford Medicine and Harvard Medical School / Beth Israel Deaconess Medical Center (with Prof. Haoqi Sun and Prof. M. Brandon Westover), where I work on multimodal physiological representations of sleep quality.

# 🔥 News
- *2026.10*: Released **ZeroMAG** preprint on arXiv ([arXiv:2610.03546](https://arxiv.org/abs/2610.03546)).
- *2026.09*: Started a research collaboration with Squirrel AI (松鼠AI).
- *2026.08*: Joined Harvard Medical School / Beth Israel Deaconess Medical Center as a research intern with Prof. Haoqi Sun (and Stanford University School of Medicine with Prof. M. Brandon Westover), working on multimodal physiological representations of objective sleep quality.
- *2026.05*: Joined the SPNI Lab, Department of Psychiatry and Behavioral Sciences, Stanford University School of Medicine, as a visiting student researcher with Prof. Yu Zhang, working on generalization of EEG foundation models for depression biomarkers.
- *2026.03*: Started **ZeroMAG** — zero-shot multimodal adapter generation for plug-and-play EEG foundation models (with Prof. Cuntai Guan).

# 📝 Publications

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv 2026</div><img src='images/ZeroMAG%20Modular%20EEG%20Logo.png' alt="ZeroMAG" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[**ZeroMAG: Zero-Shot Multimodal Adapter Generation for Plug-and-Play EEG Foundation Models**](https://arxiv.org/abs/2610.03546)

**Yubo Wang**, Jingying Ma, Xinliang Zhou, Yangxuan Zhou, Jiquan Wang, Sha Zhao, Yiyuan Yang, Yi Ding, Ziyu Jia, Chenyu Liu, Cuntai Guan

*Preprint. arXiv:2610.03546, 2026.* [[arXiv](https://arxiv.org/abs/2610.03546)] [[PDF](https://arxiv.org/pdf/2610.03546)]
- A zero-shot multimodal adapter generation framework that extends a frozen EEG encoder with plug-and-play adapters inferred from unlabeled target recordings — no target labels or retraining; +7.22 pp balanced accuracy over EEG-only inference across six held-out datasets and three backbones.
</div>
</div>

- **Do EEG Foundation Models Generalize Across Clinical Cohorts? An External Blind-Test Study of Depression Biomarkers.**
  **Yubo Wang**, Xiaoyu Tong, Xinliang Zhou, Yu Zhang. *In preparation for IEEE Journal of Biomedical and Health Informatics.*
  - External blind-test framework for depression diagnosis across independent clinical cohorts; domain-adversarial learning and prediction-bias correction using unlabeled local data; strict subject-level evaluation of cohort/site shift.

# 💼 Research Experience
- *2026.09 – Present*, **Research Collaborator**, **Tabula 2.0: Foundation Models for Structured Scientific and Cellular Data**. Mentors: Dr. Jiayuan Ding (industry), Dr. Qingsong Wen (University of Oxford). Extending the Tabula single-cell foundation model with multimodal capabilities and larger-scale pretraining toward a foundation model for unordered, heterogeneous scientific tables; discretized and latent representations with predictive and generative objectives, action-conditioned prediction under perturbations.
- *2026.08 – Present*, **Research Intern**, **PhysioRuler: Structured Physiological Representations of Whole-Night Sleep**, Stanford University School of Medicine & Harvard Medical School (BIDMC). Mentors: Prof. Haoqi Sun, Prof. M. Brandon Westover. Reference-based representation of whole-night PSG organized by sleep stage, stability, physiological system, and temporal scale; system-specific encoders for EEG/EOG/ECG/respiration with 2/10/30/120-s multiscale aggregation; 5-state hidden semi-Markov model and CAP-informed weak labels; interpretable axes for slow-wave/sigma activity, respiratory variability, and cortical/cardiorespiratory instability.
- *2026.05 – Present*, **Visiting Student Researcher**, SPNI Lab, Department of Psychiatry and Behavioral Sciences, Stanford University School of Medicine. Mentor: Prof. Yu Zhang. External blind-test framework for depression diagnosis across independent clinical cohorts using EEG foundation models, task-specific models, and clinical covariates; domain-adversarial learning and prediction-bias correction using unlabeled local development data without external test labels; strict subject-level evaluation to quantify cohort/site shift.
- *2026.03 – Present*, **Graduate Student Researcher**, Stanford SPNI Lab & Nanyang Technological University. Mentors: Prof. Yu Zhang, Prof. Cuntai Guan. Proposed ZeroMAG (see above): structure-aware weight VAE + modality–subject–task-conditioned diffusion transformer + mixture-of-experts decoder generating lightweight standalone adapters for frozen EEG backbones; +7.22 pp over EEG-only, within 0.50 pp of supervised multimodal adaptation.
- *2024.11 – 2025.06*, **Undergraduate Research Assistant**, Institute of Automation, Chinese Academy of Sciences. Mentor: Prof. Ziyu Jia. Audited shortcut learning in EEG emotion-recognition models; built a variational Bayesian heterogeneous GNN with relationship-distribution adaptation — 73.5% accuracy and 71.85% F1 under leave-one-subject-out evaluation on DEAP/DREAMER.

# 📖 Education
- *2025.09 – 2027.05 (expected)*, M.S. in Computer Science, Brown University, USA. GPA: 4.0/4.0.
- *2021.09 – 2025.06*, B.Eng. in Computer Science and Technology, Beijing Jiaotong University, China. GPA: 3.77/4.0 (Top 5%), Honors Student.

# 🎖 Honors and Awards
- *2022, 2023, 2024*, Merit Student Award (Top 5%), Beijing Jiaotong University.
- *2022, 2023, 2024*, First-Class Academic Scholarship, Beijing Jiaotong University.
- *2022*, Alumni Scholarship, Beijing Jiaotong University.

# 💻 Internships
- *2026.09 – Present*, **Squirrel AI (松鼠AI)** — Research collaboration with Dr. Qingsong Wen (Head of AI Research & Chief Scientist), working on AI agents for education.
- *2024.06 – 2024.08*, **China Academy of Railway Sciences** — Software Development Engineer. Railway knowledge AI chat platform: vector-retrieval pipeline for semantic search, containerized deployment, LLM integration.
- *2022.12 – 2023.03*, **Advanced Computer Systems Research Center, CAS** — Intern. Python data-visualization tooling; implemented the Maximal Information Coefficient (MIC) algorithm in Java.

# 🛠 Projects
- *2025.09 – 2025.12*, **MyGO: Audio Foundation Model via LeJEPA** — high-throughput tf.data pipeline over 20,000+ AudioSet clips with on-the-fly log-mel STFT for distributed training; vectorized multi-view augmentations for LeJEPA; ViT audio encoder with decoupled frequency/time positional encodings.

# ⚙️ Technical Skills
- **Programming:** Python, C++, Java, Bash; Git, Docker, LaTeX
- **Deep learning:** PyTorch, TensorFlow, multi-GPU/distributed training, Hugging Face, Weights & Biases
- **Signals & data:** EEG/PSG preprocessing (MNE, BIDS), NumPy, SciPy, Pandas, scikit-learn, Matplotlib
