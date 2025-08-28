# SortingVisualizerResponsive
That's an excellent project! A web-based sorting visualizer is a fantastic way to learn about algorithm efficiency.
Sorting Visualizer
This is a web-based sorting visualizer that lets you see how different sorting algorithms work in real time. It's a great tool for understanding the core concepts of algorithms like Bubble Sort, Selection Sort, Insertion Sort, and Merge Sort.

Features 
-   Interactive Visualization: Watch as bars of varying heights are sorted, with real-time highlighting to show which elements are being compared or swapped.
-   Multiple Algorithms: Choose from several popular sorting algorithms.
-   Dynamic Controls: Adjust the animation speed and the number of bars to see how the algorithms perform under different conditions.
-   Algorithm Information: Get detailed information on each algorithm, including:
    -   A brief description.
    -   Time and space complexity (best, average, and worst-case scenarios).
    -   Pros and cons.
    -   Pseudocode and code snippets in C++ and Java.
-   User Control: Start, stop, and reset the visualization at any time.

---

 How to Use

Simply open the `index.html` file in your web browser to get started.

1.  Select an Algorithm: Choose a sorting algorithm from the "Algorithms" section in the sidebar. Bubble Sort is selected by default.
2.  Adjust Settings: Use the sliders to change the animation speed and the number of bars you want to visualize.
3.  Start Sorting:
    -   Click the "SORT ▶" button to start the visualization.
    -   Click the "SHUFFLE ⛶" button to generate a new, random set of bars.
4.  Stop or Reset:
    -   Click the "STOP ⏸" button to pause the ongoing sort.
    -   Click the "Reset" button to stop the current sort and generate a new set of bars.

---

 File Structure

-   `index.html`: The main HTML file that provides the structure of the application.
-   `style.css`: The stylesheet that defines the layout, colors, and visual effects of the visualizer.
-   `script.js`: The JavaScript file that contains all the logic for generating bars, running the sorting algorithms, and handling user interactions.

---

 Algorithms Included

-   Bubble Sort: A simple algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
-   Selection Sort: An in-place sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly selects the minimum element from the unsorted sublist and moves it to the sorted sublist.
-   Insertion Sort: A simple sorting algorithm that builds the final sorted array one item at a time. It's much less efficient on large lists than more advanced algorithms like Merge Sort.
-   Merge Sort: A divide-and-conquer algorithm that recursively breaks down a list into sublists until each sublist has only one element, then merges the sublists back together in a sorted manner. It has a reliable `O(n log n)` time complexity.
