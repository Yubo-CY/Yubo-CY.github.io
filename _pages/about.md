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
- *2026.09*: Started a research collaboration with Squirrel AI (松鼠AI).
- *2026.08*: Joined Harvard Medical School / Beth Israel Deaconess Medical Center as a research intern with Prof. Haoqi Sun (and Stanford University School of Medicine with Prof. M. Brandon Westover), working on multimodal physiological representations of objective sleep quality.
- *2026.05*: Joined the SPNI Lab, Department of Psychiatry and Behavioral Sciences, Stanford University School of Medicine, as a visiting student researcher with Prof. Yu Zhang, working on generalization of EEG foundation models for depression biomarkers.
- *2026.03*: Started **ZeroMAG** — zero-shot multimodal adapter generation for plug-and-play EEG foundation models (with Prof. Yu Zhang and Prof. Cuntai Guan).

# 📝 Publications

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Preprint coming soon</div><img src='images/500x300.png' alt="ZeroMAG" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**ZeroMAG: Zero-Shot Multimodal Adapter Generation for Plug-and-Play EEG Foundation Models**

**Yubo Wang**\*, Chenyu Liu\*, Xinliang Zhou, Cuntai Guan, Yu Zhang

*Manuscript in preparation for ICLR 2027. Preprint coming soon to arXiv.*
- A zero-shot multimodal adaptation framework that generates plug-and-play adapters from unlabeled physiological recordings, enabling frozen EEG foundation models to incorporate EOG, ECG, EMG and more — without task-specific retraining.
</div>
</div>

# 💼 Research Experience
- *2026.08 – Present*, **Research Intern**, Stanford University School of Medicine & Harvard Medical School (BIDMC). Mentors: Prof. Haoqi Sun, Prof. M. Brandon Westover. Learning objective sleep-quality representations from multimodal physiological signals (EEG/EOG/EMG/ECG/respiration/SpO2) beyond conventional sleep-stage classification.
- *2026.05 – Present*, **Visiting Student Researcher**, SPNI Lab, Department of Psychiatry and Behavioral Sciences, Stanford University School of Medicine. Mentor: Prof. Yu Zhang. External blind-test generalization of frozen EEG foundation models for depression diagnosis and treatment-response prediction (TD-BRAIN Challenge); domain-adversarial training and reverse bias correction under domain shift.
- *2026.03 – 2026.09*, **Graduate Student Researcher**, Stanford SPNI Lab & Nanyang Technological University. Mentors: Prof. Yu Zhang, Prof. Cuntai Guan. Proposed ZeroMAG (see above): structure-aware weight VAE + conditional diffusion transformer generating lightweight standalone adapters for frozen EEG backbones.
- *2024.11 – 2025.06*, **Undergraduate Research Assistant**, Institute of Automation, Chinese Academy of Sciences. Mentor: Prof. Ziyu Jia. Audited shortcut learning in EEG emotion-recognition models; built a variational Bayesian heterogeneous GNN with relationship-distribution adaptation — 73.5% cross-subject accuracy on DEAP/DREAMER.

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
- *2025.09 – 2025.12*, **MyGO: Audio Foundation Model via LeJEPA** — asynchronous high-throughput tf.data pipeline over 20,000+ AudioSet clips; vectorized multi-view augmentation; ViT-based audio representation with decoupled positional encodings.
- *2025.09 – 2025.12*, **TerraForge: Real-Time Procedural Rendering Engine** — real-time renderer from scratch in C++/GLSL: 1.6M+ instanced L-system foliage segments, multi-layer PBR terrain, dual-pass HDR post-processing.
