export type Publication = {
  id: string;
  title: string;
  venue: "Elsevier" | "IEEE" | "Springer";
  date: string;
  summary: string;
  abstract?: string[];
  href: string;
};

export const publications: Publication[] = [
  {
    id: "ann-task-scheduling-elsevier",
    title:
      "Neural Network Inspired Efficient Scalable Task Scheduling for Cloud Infrastructure",
    venue: "Elsevier",
    date: "2024-01-01",
    href: "https://www.sciencedirect.com/science/article/pii/S2667345224000051",
    summary:
      "ANN-inspired task scheduling algorithm achieving constant-time predictions and improved power efficiency as cloud task loads scale.",
    abstract: [
      "This research introduces a task scheduling algorithm inspired by Artificial Neural Networks (ANN), designed to deliver superior power efficiency and scalability compared to existing methodologies. By leveraging the predictive capabilities of ANN, the algorithm achieves constant-time predictions, even as task loads scale significantly.",
      "Experimental evaluations using real log files demonstrate performance across metrics such as average start time, finish time, execution time, resource utilization, task failure rates, and power consumption. The model's robustness is proven in both underloaded and overloaded data center conditions, ensuring efficient task scheduling while maintaining system stability under dynamic workloads.",
    ],
  },
  {
    id: "fog-edge-ieee",
    title: "Fog and Edge Computing Issues and Challenges — A Review",
    venue: "IEEE",
    date: "2023-12-15",
    href: "https://ieeexplore.ieee.org/abstract/document/10444593",
    summary:
      "Comprehensive review of fog and edge computing challenges: security, latency, and resource utilization, with metaheuristic optimization approaches.",
    abstract: [
      "This review examines the critical challenges facing fog and edge computing architectures, which play a pivotal role in managing the explosion of sensor-driven data. The study highlights pressing issues such as security vulnerabilities, network latency, and inefficient resource utilization, providing an in-depth analysis of existing solutions.",
      "The paper explores advanced approaches, including nature-inspired algorithms and metaheuristic optimization techniques, as promising solutions to enhance the performance of fog and cloud computing systems, serving as a guide for researchers and practitioners in next-generation computing environments.",
    ],
  },
  {
    id: "harmony-search-springer",
    title:
      "Neural Network Based Task Scheduling in Cloud Using Harmony Search Algorithm",
    venue: "Springer",
    date: "2022-11-03",
    href: "https://link.springer.com/chapter/10.1007/978-3-031-08815-5_11",
    summary:
      "Harmony Search algorithm for cloud task scheduling, benchmarked against Genetic and Moth Search algorithms in CloudSim.",
    abstract: [
      "This paper investigates the application of the Harmony Search Algorithm (HS) for task scheduling in cloud environments, offering a comparative analysis against Genetic Algorithms (GA) and Moth Search Algorithms (MSA). Simulations conducted using CloudSim and MetaheuristicOpt packages reveal HS as a highly efficient and cost-effective solution for dynamic task scheduling.",
      "The study evaluates performance across key metrics, demonstrating HS's superiority in optimizing execution time, resource allocation, and operational costs, setting a foundation for further exploration in metaheuristic-based task scheduling methodologies.",
    ],
  },
];
