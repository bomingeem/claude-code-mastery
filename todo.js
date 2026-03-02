// ==================== 상태 관리 ====================
const state = {
    todos: [],
    currentFilter: 'all'
};

// ==================== DOMContentLoaded 진입점 ====================
document.addEventListener('DOMContentLoaded', function() {
    initTodoApp();
});

function initTodoApp() {
    loadFromStorage();
    renderTodos();
    initInputForm();
    initFilterButtons();
    initClearCompleted();
    initDragAndDrop();
}

// ==================== 스토리지 관리 ====================
function loadFromStorage() {
    // localStorage에서 todos 로드
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        try {
            state.todos = JSON.parse(savedTodos);
        } catch (e) {
            console.error('todos 로드 실패:', e);
            state.todos = [];
        }
    }

    // localStorage에서 필터 로드
    const savedFilter = localStorage.getItem('todoFilter');
    if (savedFilter) {
        state.currentFilter = savedFilter;
    }
}

function saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(state.todos));
    localStorage.setItem('todoFilter', state.currentFilter);
}

function generateId() {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ==================== CRUD 기능 ====================
function addTodo(text) {
    // 공백 유효성 검사
    if (!text || text.trim().length === 0) {
        showInputError();
        return;
    }

    const todo = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        createdAt: Date.now()
    };

    state.todos.unshift(todo);
    saveToStorage();
    renderTodos();
    clearInputError();
}

function toggleTodo(id) {
    const todo = state.todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveToStorage();
        renderTodos();
    }
}

function deleteTodo(id) {
    const li = document.getElementById(`todo-${id}`);
    if (li) {
        // 삭제 애니메이션
        li.classList.add('deleting');
        setTimeout(() => {
            state.todos = state.todos.filter(t => t.id !== id);
            saveToStorage();
            renderTodos();
        }, 300);
    }
}

function clearCompleted() {
    const completedCount = state.todos.filter(t => t.completed).length;
    if (completedCount === 0) {
        return;
    }

    // 완료된 항목들에 애니메이션 적용
    const completedLis = document.querySelectorAll('.todo-item.completed');
    completedLis.forEach(li => li.classList.add('deleting'));

    setTimeout(() => {
        state.todos = state.todos.filter(t => !t.completed);
        saveToStorage();
        renderTodos();
    }, 300);
}

function editTodo(id, newText) {
    const todo = state.todos.find(t => t.id === id);
    if (todo && newText.trim().length > 0) {
        todo.text = newText.trim();
        saveToStorage();
        renderTodos();
    }
}

function reorderTodos(fromId, toId) {
    const fromIndex = state.todos.findIndex(t => t.id === fromId);
    const toIndex = state.todos.findIndex(t => t.id === toId);

    if (fromIndex !== -1 && toIndex !== -1) {
        const [removed] = state.todos.splice(fromIndex, 1);
        state.todos.splice(toIndex, 0, removed);
        saveToStorage();
        renderTodos();
    }
}

// ==================== 필터 기능 ====================
function setFilter(filter) {
    state.currentFilter = filter;
    saveToStorage();
    renderTodos();
    updateFilterButtons();
}

function getFilteredTodos() {
    switch (state.currentFilter) {
        case 'active':
            return state.todos.filter(t => !t.completed);
        case 'completed':
            return state.todos.filter(t => t.completed);
        default:
            return state.todos;
    }
}

// ==================== 렌더링 함수 ====================
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    const filteredTodos = getFilteredTodos();

    // 리스트 비우기
    todoList.innerHTML = '';

    // 필터된 투두들 렌더링
    filteredTodos.forEach(todo => {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
    });

    updateItemsCount();
    toggleEmptyState();
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.id = `todo-${todo.id}`;
    li.dataset.id = todo.id;
    li.draggable = true;
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `${todo.text} 완료 체크`);
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const label = document.createElement('label');
    label.className = 'todo-text';
    label.textContent = todo.text;
    label.setAttribute('role', 'button');
    label.setAttribute('tabindex', '0');
    label.addEventListener('dblclick', () => initInlineEdit(li, todo.id));
    label.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            initInlineEdit(li, todo.id);
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.setAttribute('aria-label', `${todo.text} 삭제`);
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    return li;
}

function updateItemsCount() {
    const activeCount = state.todos.filter(t => !t.completed).length;
    const itemsCountEl = document.getElementById('items-count');
    itemsCountEl.textContent = `${activeCount}개 항목 남음`;
}

function toggleEmptyState() {
    const emptyState = document.getElementById('empty-state');
    const todoList = document.getElementById('todo-list');

    if (getFilteredTodos().length === 0) {
        emptyState.classList.remove('hidden');
        todoList.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        todoList.classList.remove('hidden');
    }
}

function updateFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        if (filter === state.currentFilter) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });
}

// ==================== 이벤트 초기화 함수 ====================
function initInputForm() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo(todoInput.value);
        todoInput.value = '';
        todoInput.focus();
    });
}

function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            setFilter(filter);
        });
    });
    updateFilterButtons();
}

function initClearCompleted() {
    const clearBtn = document.getElementById('clear-completed-btn');
    clearBtn.addEventListener('click', clearCompleted);
}

function initInlineEdit(li, id) {
    const label = li.querySelector('.todo-text');

    if (label.getAttribute('contenteditable') === 'true') {
        return; // 이미 편집 중
    }

    const originalText = label.textContent;
    label.setAttribute('contenteditable', 'true');
    label.focus();
    label.selectAll ? label.selectAll() : window.getSelection().selectAllChildren(label);

    function saveEdit() {
        const newText = label.textContent;
        label.removeAttribute('contenteditable');

        if (newText.trim().length === 0) {
            label.textContent = originalText;
        } else {
            editTodo(id, newText);
        }
    }

    label.addEventListener('blur', saveEdit, { once: true });
    label.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEdit();
        } else if (e.key === 'Escape') {
            label.textContent = originalText;
            label.removeAttribute('contenteditable');
            label.blur();
        }
    }, { once: false });
}

function initDragAndDrop() {
    const todoList = document.getElementById('todo-list');

    todoList.addEventListener('dragstart', (e) => {
        const li = e.target.closest('.todo-item');
        if (li) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', li.innerHTML);
            li.classList.add('dragging');
        }
    });

    todoList.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const li = e.target.closest('.todo-item');
        if (li && !li.classList.contains('dragging')) {
            li.classList.add('drag-over');
        }
    });

    todoList.addEventListener('dragleave', (e) => {
        const li = e.target.closest('.todo-item');
        if (li) {
            li.classList.remove('drag-over');
        }
    });

    todoList.addEventListener('drop', (e) => {
        e.preventDefault();

        const draggingItem = document.querySelector('.todo-item.dragging');
        const targetItem = e.target.closest('.todo-item');

        if (draggingItem && targetItem && draggingItem !== targetItem) {
            const fromId = draggingItem.dataset.id;
            const toId = targetItem.dataset.id;
            reorderTodos(fromId, toId);
        }

        // 모든 드래그 피드백 제거
        document.querySelectorAll('.todo-item.dragging, .todo-item.drag-over').forEach(li => {
            li.classList.remove('dragging', 'drag-over');
        });
    });

    todoList.addEventListener('dragend', () => {
        document.querySelectorAll('.todo-item.dragging, .todo-item.drag-over').forEach(li => {
            li.classList.remove('dragging', 'drag-over');
        });
    });
}

// ==================== 입력 오류 처리 ====================
function showInputError() {
    const errorEl = document.getElementById('input-error');
    errorEl.classList.remove('hidden');
    setTimeout(() => {
        clearInputError();
    }, 3000);
}

function clearInputError() {
    const errorEl = document.getElementById('input-error');
    errorEl.classList.add('hidden');
}
