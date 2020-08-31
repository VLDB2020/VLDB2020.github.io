    ---
layout: default
title: VLDB2020 Tutorials
category: forparticipants
---
# VLDB2020: Tutorials

## Tutorial 1 - Building High Throughput Permissioned Blockchain Fabrics: Challenges and Opportunities (Day 1, Block 2) [07T]

> Start at <span class="timeUTC">2020-09-01T16:00:00Z</span>

* Speakers: Suyash Gupta (University of California Davis), Jelle Hellings (University of California Davis), Sajjad Rahnama (University of California Davis), Mohammad Sadoghi (University of California, Davis)

### Abstract

Since the introduction of Bitcoin – the first widespread application driven by blockchains – the interest in the design of blockchain-based applications has increased tremendously. At the core of these applications are consensus protocols that securely replicate client requests among all replicas, even if some replicas are Byzantine faulty. Unfortunately, these consensus protocols typically have low throughput, and this lack of performance is often cited as the reason for the slow wider adoption of blockchain technology. Consequently, many works focus on designing more efficient consensus protocols to increase throughput of consensus.
We believe that this focus on consensus protocols only explains part of the story. To investigate this belief, we raise a simple question: Can a well-crafted system using a classical consensus protocol outperform systems using modern protocols? In this tutorial, we answer this question by diving deep into the design of blockchain systems. Further, we take an in-depth look at the theory behind consensus, which can help users select the protocol that best-fits their requirements. Finally, we share our vision of high-throughput blockchain systems that operate at large scales.

----

## Tutorial 2 - Tutorial 2: Robust Query Processing: Mission Possible (Day 1, Block 3) [12T]
> Start at <span class="timeUTC">2020-09-01T22:00:00Z</span>

* Speaker: Jayant R. Haritsa (Indian Institute of Science, Bangalore, India)

### Abstract

Robust query processing with strong performance guarantees is an extremely desirable objective in the design of industrial-strength database engines. However, it has proved to be a largely intractable and elusive challenge in spite of sustained efforts spanning several decades. The good news is that in recent times, there have been a host of exciting technical advances, at different levels in the database architecture, that collectively promise to materially address this problem. In this tutorial, we will present these novel research approaches, characterize their strengths and limitations,
and enumerate open technical problems that remain to be solved to make robust query processing a contemporary reality.

----

## Tutorial 3 - Data Collection and Quality Challenges for Deep Learning (Day 1, Block 4) [16T]

> Start at <span class="timeUTC">2020-09-02T03:00:00Z</span>

* Speakers: Steven Euijong Whang (KAIST) and Jae-Gil Lee (KAIST)

### Abstract

Software 2.0 refers to the fundamental shift in software engineering where using machine learning becomes the new norm in software with the availability of big data and computing infrastructure. As a result, many software engineering practices need to be rethought from scratch where data becomes a first-class citizen, on par with code. It is well known that 80-90% of the time for machine learning development is spent on data preparation. Also, even the best machine learning algorithms cannot perform well without good data or at least handling biased and dirty data during model training. In this tutorial, we focus on data collection and quality challenges that frequently occur in deep learning applications. Compared to traditional machine learning, there is less need for feature engineering, but more need for significant amounts of data. We thus go through state-of-the-art data collection techniques for machine learning. Then, we cover data validation and cleaning techniques for improving data quality. Even if the data is still problematic, hope is not lost, and we cover fair and robust training techniques for handling data bias and errors. We believe that the data management community is well poised to lead the research in these directions. The presenters have extensive experience in developing machine learning platforms and publishing papers in top-tier database, data mining, and machine learning venues.

----

## Tutorial 4 - Similarity Query Processing for High-Dimensional Data (Day 2, Block 1) [22T]

> Start at <span class="timeUTC">2020-09-02T09:00:00Z</span>

* Speakers: Jianbin Qin (Shenzhen Institute of Computing Sciences, Shenzhen University), Wei Wang (University of New South Wales), Chuan Xiao (Osaka University & Nagoya University), Ying Zhang (University of Technology Sydney)

### Abstract
Similarity query processing has been an active research topic for several decades. It is an essential procedure in a wide range of applications. Recently, embedding and auto-encoding methods as well as pre-trained models have gained popularity. They basically deal with high-dimensional data, and this trend brings new opportunities and challenges to similarity query processing for high-dimensional data. Meanwhile, new techniques have emerged to tackle this long-standing problem theoretically and empirically. In this tutorial, we summarize existing solutions, especially recent advancements from both database (DB) and machine learning (ML) communities, and analyze their strengths and weaknesses. We review exact and approximate methods such as cover tree, locality sensitive hashing, product quantization, and proximity graphs. We also discuss the selectivity estimation problem and show how researchers are bringing in state-of-the-art ML techniques to address the problem. By highlighting the strong connections between DB and ML, we hope that this tutorial provides an impetus towards new ML for DB solutions and vice versa.

----

## Tutorial 5 - Table Extraction and Understanding for Scientific and Enterprise Applications (Day 2, Block 3) [31T]

> Start at <span class="timeUTC">2020-09-02T21:00:00Z</span>

* Speakers: Douglas Burdick, Alexandre Evfimievski, Nancy (Xin Ru) Wang, Yannis Katsis, Marina Danilevsky (IBM Research Almaden)

### Abstract

Valuable high-precision data are often published in the form of tables in both scientific and business documents. While humans can easily identify, interpret and contextualize tables, developing general-purpose automated techniques for extraction of information from tables is difficult due to the wide variety of table formats employed across corpora.
To extract useful data from tables, data cells must be correctly extracted and linked to all relevant headers, units of measure and in-text references. Table extraction involves identifying the border and cell structure for each document table, while table understanding provides context by linking cells with semantic information inside and outside the table, such as row and column headers, footnotes, titles, and references in surrounding text.
The objective of this tutorial is to provide a detailed synopsis of existing approaches for table extraction and understanding, highlight open research problems, and provide an overview of potential applications.

----

## Tutorial 6 - Fairly Evaluating and Scoring Items in a Data Set (Day 3, Block 2) [47T]

> Start at <span class="timeUTC">2020-09-03T16:00:00Z</span>

* Speakers: Abolfazl Asudeh (University of Illinois, Chicago), H. V. Jagadish (University of Michigan, Ann Arbor)

### Abstract

We frequently compute a score for each item in a data set, sometimes for its intrinsic value, but more often as a step towards classification, ranking, and so forth.
The importance of computing this score fairly cannot be overstated. In this tutorial, we will develop a framework for how to think about this task, and then present techniques for responsible scoring and link these to traditional data management challenges.



