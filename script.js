const container = document.getElementById("bar-container");
const sortBtn = document.getElementById("sortBtn");
const stopBtn = document.getElementById("stopBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");
const speedRange = document.getElementById("speedRange");
const barsRange = document.getElementById("barsRange");
const radios = document.querySelectorAll('input[name="algo"]');

const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");
const bestEl = document.getElementById("best");
const avgEl = document.getElementById("avg");
const worstEl = document.getElementById("worst");
const spaceEl = document.getElementById("space");
const infoPros = document.getElementById("infoPros");
const infoCons = document.getElementById("infoCons");
const codePseudo = document.getElementById("pseudo");
const codeCpp = document.getElementById("cpp");
const codeJava = document.getElementById("java");

let array = [];
let bars = [];
let delay = 50;
let currentAlgo = "bubble";
let isSorting = false;

// -------------------------
// UI Control
// -------------------------
function toggleButtons(state) {
  sortBtn.disabled = state;
  shuffleBtn.disabled = state;
  resetBtn.disabled = state;
  barsRange.disabled = state;
  radios.forEach(radio => radio.disabled = state);
  stopBtn.disabled = !state; // Correctly enables/disables the stop button
}

// -------------------------
// Bar Color Helpers
// -------------------------
async function highlightCompare(i, j) {
  if (!isSorting) return;
  bars[i].classList.add("comparing");
  bars[j].classList.add("comparing");
  await new Promise(res => setTimeout(res, delay));
  bars[i].classList.remove("comparing");
  bars[j].classList.remove("comparing");
}

async function swap(i, j) {
  if (!isSorting) return;
  return new Promise(resolve => {
    bars[i].classList.add("swapping");
    bars[j].classList.add("swapping");

    let h1 = bars[i].style.height;
    let h2 = bars[j].style.height;
    bars[i].style.height = h2;
    bars[j].style.height = h1;

    setTimeout(() => {
      bars[i].classList.remove("swapping");
      bars[j].classList.remove("swapping");
      resolve();
    }, delay);
  });
}

// -------------------------
// Algorithm Info
// -------------------------
const INFO = {
  bubble: {
    title: "Bubble Sort",
    text: "Bubble Sort repeatedly swaps adjacent elements if they are in the wrong order.",
    complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
    pros: ["Simple to implement", "Best case O(n) when nearly sorted"],
    cons: ["Slow for large inputs", "Too many swaps"],
    pseudo: `repeat n-1 times
  for i from 0 to n-2
    if A[i] > A[i+1]
      swap(A[i], A[i+1])`,
    cpp: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++)
    for (int j = 0; j < n-i-1; j++)
      if (arr[j] > arr[j+1])
        swap(arr[j], arr[j+1]);
}`,
    java: `void bubbleSort(int arr[]) {
  int n = arr.length;
  for (int i = 0; i < n-1; i++)
    for (int j = 0; j < n-i-1; j++)
      if (arr[j] > arr[j+1]) {
        int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;
      }
}`
  },
  selection: {
    title: "Selection Sort",
    text: "Selection Sort selects the minimum element from the unsorted part and swaps it.",
    complexity: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
    pros: ["Simple implementation", "Minimum swaps"],
    cons: ["Always O(n²)", "Not stable"],
    pseudo: `for i from 0 to n-1
  minIndex = i
  for j from i+1 to n-1
    if A[j] < A[minIndex]
      minIndex = j
  swap(A[i], A[minIndex])`,
    cpp: `void selectionSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    int min = i;
    for (int j = i+1; j < n; j++)
      if (arr[j] < arr[min]) min = j;
    swap(arr[i], arr[min]);
  }
}`,
    java: `void selectionSort(int arr[]) {
  int n = arr.length;
  for (int i = 0; i < n-1; i++) {
    int min = i;
    for (int j = i+1; j < n; j++)
      if (arr[j] < arr[min]) min = j;
    int t = arr[min]; arr[min] = arr[i]; arr[i] = t;
  }
}`
  },
  insertion: {
    title: "Insertion Sort",
    text: "Insertion Sort builds the sorted array one item at a time.",
    complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
    pros: ["Fast for small inputs", "Stable"],
    cons: ["Slow for large arrays"],
    pseudo: `for i from 1 to n-1
  key = A[i]
  j = i-1
  while j>=0 and A[j] > key
    A[j+1] = A[j]
    j--
  A[j+1] = key`,
    cpp: `void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i], j = i-1;
    while (j >= 0 && arr[j] > key) {
      arr[j+1] = arr[j]; j--;
    }
    arr[j+1] = key;
  }
}`,
    java: `void insertionSort(int arr[]) {
  int n = arr.length;
  for (int i = 1; i < n; i++) {
    int key = arr[i], j = i-1;
    while (j >= 0 && arr[j] > key) {
      arr[j+1] = arr[j]; j--;
    }
    arr[j+1] = key;
  }
}`
  },
  merge: {
    title: "Merge Sort",
    text: "Merge Sort divides the array and merges sorted halves.",
    complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
    pros: ["Fast and stable", "Consistent O(n log n)"],
    cons: ["Needs extra space", "More complex"],
    pseudo: `if left < right
  mid = (left+right)/2
  mergeSort(A,left,mid)
  mergeSort(A,mid+1,right)
  merge(A,left,mid,right)`,
    cpp: `void mergeSort(int arr[], int l, int r) {
  if (l >= r) return;
  int m = (l+r)/2;
  mergeSort(arr,l,m);
  mergeSort(arr,m+1,r);
  merge(arr,l,m,r);
}`,
    java: `void mergeSort(int arr[], int l, int r) {
  if (l >= r) return;
  int m = (l+r)/2;
  mergeSort(arr,l,m);
  mergeSort(arr,m+1,r);
  merge(arr,l,m,r);
}`
  }
};

// -------------------------
// Update Info Panel
// -------------------------
function setAlgoFromRadios(){
  const r = document.querySelector('input[name="algo"]:checked');
  currentAlgo = r ? r.value : "bubble";
  const { title, text, complexity, pros, cons, pseudo, cpp, java } = INFO[currentAlgo];
  infoTitle.textContent = title;
  infoText.textContent = text;
  bestEl.textContent = complexity.best;
  avgEl.textContent  = complexity.avg;
  worstEl.textContent= complexity.worst;
  spaceEl.textContent= complexity.space;
  infoPros.innerHTML = pros.map(p=>`<li>${p}</li>`).join("");
  infoCons.innerHTML = cons.map(n=>`<li>${n}</li>`).join("");
  codePseudo.textContent = pseudo.trim();
  codeCpp.textContent    = cpp.trim();
  codeJava.textContent   = java.trim();
}

document.querySelectorAll('input[name="algo"]').forEach(r=>{
  r.addEventListener("change", setAlgoFromRadios);
});

// -------------------------
// Bar Setup
// -------------------------
function generateBars(num=50){
  container.innerHTML = "";
  array = [];
  for (let i=0;i<num;i++) array.push(Math.floor(Math.random()*300)+10);
  for (let val of array){
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = val+"px";
    container.appendChild(bar);
  }
  bars = document.querySelectorAll(".bar");
}
generateBars(60);
setAlgoFromRadios();
toggleButtons(false); // Make sure the stop button is initially disabled

shuffleBtn.addEventListener("click", ()=>generateBars(barsRange.value));
resetBtn.addEventListener("click", ()=>{
  isSorting = false;
  generateBars(barsRange.value);
  toggleButtons(false);
});
barsRange.addEventListener("input", e=>generateBars(e.target.value));
speedRange.addEventListener("input", e=>delay = 101-e.target.value);

// -------------------------
// Sorting Algorithms
// -------------------------
async function bubbleSort(){
  let n = bars.length;
  for (let i=0;i<n-1;i++){
    for (let j=0;j<n-i-1;j++){
      if (!isSorting) return;
      await highlightCompare(j, j+1);
      if (parseInt(bars[j].style.height) > parseInt(bars[j+1].style.height)){
        await swap(j,j+1);
      }
    }
    if (isSorting) bars[n-i-1].classList.add("sorted");
  }
  if (isSorting) bars[0].classList.add("sorted");
}

async function selectionSort(){
  let n = bars.length;
  for (let i=0;i<n;i++){
    if (!isSorting) return;
    let min=i;
    for (let j=i+1;j<n;j++){
      if (!isSorting) return;
      await highlightCompare(j, min);
      if (parseInt(bars[j].style.height) < parseInt(bars[min].style.height)) min=j;
    }
    await swap(i,min);
    if (isSorting) bars[i].classList.add("sorted");
  }
}

async function insertionSort(){
  let n = bars.length;
  for (let i=1;i<n;i++){
    if (!isSorting) return;
    let j=i;
    while(j>0 && parseInt(bars[j-1].style.height) > parseInt(bars[j].style.height)){
      if (!isSorting) return;
      await highlightCompare(j, j-1);
      await swap(j,j-1);
      j--;
    }
    if (isSorting) bars[i].classList.add("sorted");
  }
}

async function mergeSort(l=0,r=bars.length-1){
  if (!isSorting) return;
  if (l>=r) return;
  let m = Math.floor((l+r)/2);
  await mergeSort(l,m);
  await mergeSort(m+1,r);
  await merge(l,m,r);
}

async function merge(l,m,r){
  if (!isSorting) return;
  let left=[], right=[];
  for (let i=l;i<=m;i++) left.push(parseInt(bars[i].style.height));
  for (let i=m+1;i<=r;i++) right.push(parseInt(bars[i].style.height));
  let i=0,j=0,k=l;
  while(i<left.length && j<right.length){
    if (!isSorting) return;
    if (left[i]<=right[j]){
      bars[k].style.height=left[i++]+"px";
    } else {
      bars[k].style.height=right[j++]+"px";
    }
    await new Promise(res=>setTimeout(res,delay));
    k++;
  }
  while(i<left.length){
    if (!isSorting) return;
    bars[k++].style.height=left[i++]+"px";
    await new Promise(res=>setTimeout(res,delay));
  }
  while(j<right.length){
    if (!isSorting) return;
    bars[k++].style.height=right[j++]+"px";
    await new Promise(res=>setTimeout(res,delay));
  }
  if (isSorting) {
    for (let x=l;x<=r;x++) bars[x].classList.add("sorted");
  }
}

// -------------------------
// Run Sort
// -------------------------
sortBtn.addEventListener("click", async ()=>{
  if (isSorting) return;
  isSorting = true;
  toggleButtons(true);
  bars.forEach(bar => bar.classList.remove("sorted"));

  try {
    if (currentAlgo==="bubble") await bubbleSort();
    else if (currentAlgo==="selection") await selectionSort();
    else if (currentAlgo==="insertion") await insertionSort();
    else if (currentAlgo==="merge") await mergeSort();
  } finally {
    // This ensures buttons are re-enabled even if an error occurs
    isSorting = false;
    toggleButtons(false);
  }

  if (!isSorting) {
    bars.forEach(bar => bar.classList.add("sorted"));
  }
});

stopBtn.addEventListener("click", ()=>{
  isSorting = false;
  bars.forEach(bar => {
    bar.classList.remove("sorted", "comparing", "swapping", "pivot");
  });
  toggleButtons(false);
});