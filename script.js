// 配列を視覚化する関数
function visualizeArray(array) {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    const maxValue = Math.max(...array);
    
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        const width = (value / maxValue) * 100;
        bar.style.width = `${width}%`;
        
        const valueSpan = document.createElement('span');
        valueSpan.className = 'array-bar-value';
        valueSpan.textContent = value;
        
        bar.appendChild(valueSpan);
        container.appendChild(bar);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const algorithmSelect = document.getElementById('algorithm-select');
    const runBtn = document.getElementById('run-btn');
    const stepBtn = document.getElementById('step-btn');
    const speedControl = document.getElementById('speed-control');
    const speedValue = document.getElementById('speed-value');
    const randomDataBtn = document.getElementById('random-data');
    const manualInput = document.getElementById('manual-input');
    const explanationArea = document.getElementById('algorithm-description');
    const searchBtn = document.getElementById('search-btn');
    const searchTargetInput = document.getElementById('search-target');
    const searchResultText = document.getElementById('search-result-text');

    let currentAlgorithm = null;
    let data = [];
    let animationSpeed = 1000; // ミリ秒単位のアニメーション速度
    let searchTarget = null;
    // アルゴリズム選択時の処理
    algorithmSelect.addEventListener('change', () => {
        currentAlgorithm = algorithmSelect.value;
        updateExplanation(currentAlgorithm);
    });

    // 実行ボタンクリック時の処理
    runBtn.addEventListener('click', async () => {
        if (currentAlgorithm && data.length > 0) {
            console.log(`${currentAlgorithm}を実行します。データ: ${data}`);
            switch (currentAlgorithm) {
                case 'selection':
                    await selectionSort([...data]);
                    break;
                case 'bubble':
                    await bubbleSort([...data]);
                    break;
                case 'insertion':
                    await insertionSort([...data]);
                    break;
                case 'quick':
                    await quickSort([...data]);
                    break;
                case 'merge':
                    await mergeSort([...data]);
                    break;
                default:
                    alert('選択されたアルゴリズムはまだ実装されていません。');
            }
        } else {
            alert('アルゴリズムを選択し、データを入力してください。');
        }
    });


    // ステップ実行ボタンクリック時の処理
    stepBtn.addEventListener('click', () => {
        if (currentAlgorithm && data.length > 0) {
            console.log(`${currentAlgorithm}をステップ実行します。`);
            // ここにステップ実行のコードを追加
        } else {
            alert('アルゴリズムを選択し、データを入力してください。');
        }
    });

    // 速度調整時の処理
    speedControl.addEventListener('input', () => {
        speedValue.textContent = `x${speedControl.value}`;
        animationSpeed = 1000 / parseFloat(speedControl.value);
    });

    // ランダムデータ生成ボタンクリック時の処理
    randomDataBtn.addEventListener('click', () => {
        data = generateRandomData(10);
        manualInput.value = data.join(', ');
        updateDataVisualization();
    });

    // 手動入力時の処理
    manualInput.addEventListener('change', () => {
        data = manualInput.value.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        updateDataVisualization();
    });

    // ランダムデータ生成関数
    function generateRandomData(length) {
        return Array.from({length}, () => Math.floor(Math.random() * 100));
    }

    // アルゴリズムの説明を更新する関数
    function updateExplanation(algorithm) {
        const explanations = {
            'bubble': 'バブルソート: 隣接する要素を比較し、必要に応じて交換を繰り返すシンプルなソートアルゴリズムです。',
            'selection': '選択ソート: 未ソートの部分から最小値を選択し、ソート済み部分の末尾に追加していくアルゴリズムです。',
            'insertion': '挿入ソート: ソート済み部分に新しい要素を適切な位置に挿入していくアルゴリズムです。',
            'quick': 'クイックソート: ピボットを選んで分割統治法を用いる効率的なソートアルゴリズムです。',
            'merge': 'マージソート: 分割統治法を用いて配列を分割し、ソートしながらマージするアルゴリズムです。',
            'linear': '線形探索: 配列の先頭から順に探索する単純なアルゴリズムです。',
            'binary': '二分探索: ソート済みの配列で、中央の値と比較しながら探索範囲を半分に絞っていくアルゴリズムです。',
            'dfs': '深さ優先探索(DFS): グラフやツリーを探索する際に、可能な限り深く進んでから戻るアルゴリズムです。',
            'bfs': '幅優先探索(BFS): グラフやツリーを探索する際に、現在の深さのノードを全て探索してから次の深さに進むアルゴリズムです。'
        };
        explanationArea.textContent = explanations[algorithm] || 'アルゴリズムを選択してください。';
    }

    // データが変更されたときに配列を視覚化
    function updateDataVisualization() {
        visualizeArray(data);
    }

     // 探索ボタンのイベントリスナー
    searchBtn.addEventListener('click', async () => {
        if (currentAlgorithm && data.length > 0) {
            searchTarget = parseInt(searchTargetInput.value);
            if (isNaN(searchTarget)) {
                alert('有効な探索対象を入力してください。');
                return;
            }
            console.log(`${currentAlgorithm}を実行します。探索対象: ${searchTarget}`);
            let result;
            switch (currentAlgorithm) {
                case 'linear':
                    result = await linearSearch([...data], searchTarget);
                    break;
                case 'binary':
                    result = await binarySearch([...data].sort((a, b) => a - b), searchTarget);
                    break;
                case 'dfs':
                case 'bfs':
                    alert('グラフ探索アルゴリズムはこの例では実装していません。');
                    return;
                default:
                    alert('選択された探索アルゴリズムはまだ実装されていません。');
                    return;
            }
            displaySearchResult(result);
        } else {
            alert('アルゴリズムを選択し、データを入力してください。');
        }
    });

    function displaySearchResult(result) {
        const searchResultText = document.getElementById('search-result-text');
        if (result !== -1) {
            searchResultText.textContent = `探索対象 ${searchTarget} が位置 ${result} で見つかりました。`;
        } else {
            searchResultText.textContent = `探索対象 ${searchTarget} は見つかりませんでした。`;
        }
    }

    // 選択ソートアルゴリズムの実装
    async function selectionSort(arr) {
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                // 要素の交換
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                visualizeArray(arr);
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
        }
        return arr;
    }

    // バブルソートの実装
    async function bubbleSort(arr) {
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    visualizeArray(arr);
                    await new Promise(resolve => setTimeout(resolve, animationSpeed));
                }
            }
        }
        return arr;
    }

    // クイックソートの実装
    async function quickSort(arr, low = 0, high = arr.length - 1) {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSort(arr, low, pi - 1);
            await quickSort(arr, pi + 1, high);
        }
        return arr;
    }

    async function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                visualizeArray(arr);
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        visualizeArray(arr);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        return i + 1;
    }
    
    // 挿入ソートの実装
async function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            visualizeArray(arr);
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
        }
        arr[j + 1] = key;
        visualizeArray(arr);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }
    return arr;
}

// マージソートの実装
async function mergeSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }
    return arr;
}

async function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[left + i];
    for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
        visualizeArray(arr);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        visualizeArray(arr);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        visualizeArray(arr);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }
}

async function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        visualizeSearchArray(arr, i);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

async function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        visualizeSearchArray(arr, mid, left, right);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

function visualizeSearchArray(arr, current, left = 0, right = arr.length - 1) {
    const container = document.getElementById('search-container');
    container.innerHTML = '';
    const maxHeight = 150; // 最大の高さをさらに小さく
    const maxValue = Math.max(...arr);
    
    arr.forEach((value, index) => {
        const element = document.createElement('div');
        element.className = 'search-element';
        const height = Math.max((value / maxValue) * maxHeight, 5); // 最小高さを5pxに
        element.style.height = `${height}px`;
        element.setAttribute('data-value', value); // 値をdata属性として設定
        
        if (index === current) {
            element.style.backgroundColor = '#e74c3c';
        } else if (index >= left && index <= right) {
            element.style.backgroundColor = '#2ecc71';
        }
        
        container.appendChild(element);
    });
}

function visualizeArray(array) {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    const maxValue = Math.max(...array);
    
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        const width = (value / maxValue) * 100;
        bar.style.width = `${width}%`;
        
        const valueSpan = document.createElement('span');
        valueSpan.className = 'array-bar-value';
        valueSpan.textContent = value;
        
        bar.appendChild(valueSpan);
        container.appendChild(bar);
    });
}


function displayResult(message) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = message;
}
    // 初期表示
    updateDataVisualization();
});