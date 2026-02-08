// 应用状态
let currentState = {
    scenario: '',
    need: '',
    methodology: '',
    context: '',
    answer: '',
    reflection: '',
    timestamp: '',
    currentView: 'home'
};

let practiceHistory = [];
let currentTreeNode = 'start';

// 初始化应用
function initApp() {
    loadHistory();
    renderHome();
    setupEventListeners();
}

// 设置事件监听
function setupEventListeners() {
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterMethodologies(e.target.value);
        });
    }
}

// 渲染首页
function renderHome() {
    currentState.currentView = 'home';
    document.getElementById('homeView').style.display = 'block';
    document.getElementById('practiceView').style.display = 'none';
    
    renderMethodologyGrid();
    renderScenarioSection();
    renderDecisionTree();
}

// 渲染方法论网格
function renderMethodologyGrid() {
    const grid = document.getElementById('methodologyGrid');
    if (!grid) return;
    
    grid.innerHTML = Object.keys(methodologies).map(key => {
        const method = methodologies[key];
        return `
            <div class="methodology-card" onclick="selectMethodologyDirect('${key}')">
                <span class="category">${method.category}</span>
                <h3>${method.name}</h3>
                <div class="description">${method.description}</div>
                <div class="tags">
                    <span class="tag">难度: ${method.difficulty}</span>
                    ${method.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// 筛选方法论
function filterMethodologies(searchTerm) {
    const cards = document.querySelectorAll('.methodology-card');
    const term = searchTerm.toLowerCase();
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 按类别筛选
function filterByCategory(category) {
    const cards = document.querySelectorAll('.methodology-card');
    
    // 更新筛选标签状态
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (category === 'all') {
        cards.forEach(card => card.style.display = 'block');
        return;
    }
    
    cards.forEach(card => {
        const categorySpan = card.querySelector('.category');
        if (categorySpan && categorySpan.textContent === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 渲染场景选择区域
function renderScenarioSection() {
    const section = document.getElementById('scenarioCards');
    if (!section) return;
    
    const scenarios = [
        { id: 'work', icon: '💼', name: '工作场景', desc: '向领导汇报、项目复盘、团队会议、跨部门协作等' },
        { id: 'learning', icon: '📚', name: '学习场景', desc: '学习新知识、阅读论文、向导师请教、自我反思等' },
        { id: 'innovation', icon: '💡', name: '创新场景', desc: '产品创新、头脑风暴、突破僵局、商业模式创新等' },
        { id: 'decision', icon: '🎲', name: '决策场景', desc: '技术选型、风险评估、资源分配、投资决策等' }
    ];
    
    section.innerHTML = scenarios.map(s => `
        <div class="scenario-card" onclick="selectScenario('${s.id}')">
            <div class="icon">${s.icon}</div>
            <h3>${s.name}</h3>
            <p>${s.desc}</p>
        </div>
    `).join('');
}

// 渲染决策树
function renderDecisionTree() {
    const container = document.getElementById('decisionTreeContent');
    if (!container) return;
    
    const node = decisionTree[currentTreeNode];
    
    container.innerHTML = `
        <div class="tree-node">
            <h4>${node.question}</h4>
            <div class="tree-options">
                ${node.options.map(opt => `
                    <div class="tree-option" onclick="handleTreeOption('${opt.next || ''}', '${opt.method || ''}')">
                        ${opt.text}
                    </div>
                `).join('')}
            </div>
        </div>
        ${currentTreeNode !== 'start' ? '<button class="btn btn-secondary" onclick="resetDecisionTree()">重新开始</button>' : ''}
    `;
}

// 处理决策树选项
function handleTreeOption(next, method) {
    if (method) {
        // 到达叶子节点，显示方法论
        selectMethodologyDirect(method);
    } else if (next) {
        // 继续决策树
        currentTreeNode = next;
        renderDecisionTree();
    }
}

// 重置决策树
function resetDecisionTree() {
    currentTreeNode = 'start';
    renderDecisionTree();
}

// 直接选择方法论
function selectMethodologyDirect(methodKey) {
    currentState.methodology = methodKey;
    showPracticeView(methodKey);
}

// 选择场景
function selectScenario(scenario) {
    currentState.scenario = scenario;
    showSpecificNeeds(scenario);
}

// 显示具体需求
function showSpecificNeeds(scenario) {
    const needs = scenarioNeeds[scenario];
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 40px; max-width: 600px; max-height: 80vh; overflow-y: auto;">
            <h2 style="margin-bottom: 20px;">选择具体需求</h2>
            <div style="display: grid; gap: 15px;">
                ${needs.map(need => `
                    <button class="option-btn" onclick="selectNeed('${need.id}', '${need.methods[0]}'); this.closest('[style*=fixed]').remove();">
                        <strong>${need.name}</strong><br>
                        <small>推荐方法：${need.methods.join('、')}</small>
                    </button>
                `).join('')}
            </div>
            <button class="btn btn-secondary" style="margin-top: 20px; width: 100%;" onclick="this.closest('[style*=fixed]').remove();">取消</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 选择具体需求
function selectNeed(needId, defaultMethod) {
    currentState.need = needId;
    currentState.methodology = defaultMethod;
    showPracticeView(defaultMethod);
}

// 显示实践视图
function showPracticeView(methodKey) {
    currentState.currentView = 'practice';
    document.getElementById('homeView').style.display = 'none';
    document.getElementById('practiceView').style.display = 'block';
    
    showMethodology(methodKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 显示方法论信息
function showMethodology(methodKey) {
    const method = methodologies[methodKey];
    
    // 更新方法论信息
    document.getElementById('methodologyInfo').innerHTML = `
        <h3>🎯 ${method.name}</h3>
        <div class="description">${method.description}</div>
        <div class="tags">
            <span class="tag">${method.category}</span>
            <span class="tag">难度: ${method.difficulty}</span>
            ${method.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;
    
    // 显示问题列表，每个问题都有独立的输入框
    document.getElementById('questionsList').innerHTML = `
        <h4 style="margin-bottom: 15px;">🤔 思考框架（按顺序回答这些问题）</h4>
        ${method.questions.map((q, i) => `
            <div class="question-item-with-input">
                <div class="question-label">
                    <strong>问题 ${i + 1}:</strong> ${q}
                </div>
                <textarea 
                    class="question-answer" 
                    id="answer_${i}" 
                    placeholder="在这里写下你的回答..."
                    data-question="${q.replace(/"/g, '&quot;')}"
                ></textarea>
            </div>
        `).join('')}
    `;
    
    // 显示示例
    document.getElementById('exampleText').textContent = method.example;
    
    // 清空输入框
    document.getElementById('contextInput').value = '';
    document.getElementById('reflectionInput').value = '';
}

// 返回首页
function backToHome() {
    renderHome();
}

// 提交实践记录
function submitPractice() {
    const context = document.getElementById('contextInput').value.trim();
    const reflection = document.getElementById('reflectionInput').value.trim();
    
    // 收集所有问题和答案
    const questionAnswers = [];
    const answerInputs = document.querySelectorAll('.question-answer');
    let hasAnswer = false;
    
    answerInputs.forEach((input, index) => {
        const question = input.getAttribute('data-question');
        const answer = input.value.trim();
        
        if (answer) {
            hasAnswer = true;
        }
        
        questionAnswers.push({
            questionNumber: index + 1,
            question: question,
            answer: answer
        });
    });
    
    if (!context) {
        alert('请填写问题描述！');
        return;
    }
    
    if (!hasAnswer) {
        alert('请至少回答一个问题！');
        return;
    }
    
    const method = methodologies[currentState.methodology];
    
    const record = {
        timestamp: new Date().toISOString(),
        scenario: currentState.scenario,
        need: currentState.need,
        methodology: currentState.methodology,
        methodologyName: method.name,
        methodologyCategory: method.category,
        methodologyDescription: method.description,
        methodologyTags: method.tags,
        context: context,
        questionAnswers: questionAnswers,
        reflection: reflection
    };
    
    practiceHistory.unshift(record);
    saveHistory();
    
    // 显示成功消息
    showSuccessMessage('✅ 实践记录已保存！包含 ' + questionAnswers.filter(qa => qa.answer).length + ' 个问题的回答。');
    
    // 显示历史记录
    document.getElementById('historySection').style.display = 'block';
    renderHistory();
    
    // 滚动到历史记录
    setTimeout(() => {
        document.getElementById('historySection').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// 显示成功消息
function showSuccessMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.textContent = message;
    
    const practiceArea = document.querySelector('.practice-area');
    practiceArea.insertBefore(alertDiv, practiceArea.firstChild);
    
    setTimeout(() => alertDiv.remove(), 3000);
}

// 重新开始
function resetPractice() {
    if (confirm('确定要重新开始吗？当前填写的内容不会被保存。')) {
        document.getElementById('contextInput').value = '';
        document.getElementById('reflectionInput').value = '';
        
        // 清空所有问题答案
        document.querySelectorAll('.question-answer').forEach(input => {
            input.value = '';
        });
        
        backToHome();
    }
}

// 加载历史记录
function loadHistory() {
    const saved = localStorage.getItem('methodologyPractice');
    if (saved) {
        practiceHistory = JSON.parse(saved);
        if (practiceHistory.length > 0) {
            const historySection = document.getElementById('historySection');
            if (historySection) {
                historySection.style.display = 'block';
                renderHistory();
            }
        }
    }
}

// 保存历史记录
function saveHistory() {
    localStorage.setItem('methodologyPractice', JSON.stringify(practiceHistory));
}

// 渲染历史记录
function renderHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    
    historyList.innerHTML = practiceHistory.slice(0, 10).map(record => {
        const answeredCount = record.questionAnswers 
            ? record.questionAnswers.filter(qa => qa.answer).length 
            : 0;
        
        return `
            <div class="history-item" onclick="viewHistoryDetail(${practiceHistory.indexOf(record)})">
                <div class="timestamp">${new Date(record.timestamp).toLocaleString('zh-CN')}</div>
                <div class="method-name">${record.methodologyName}</div>
                <div><strong>问题：</strong>${record.context.substring(0, 100)}${record.context.length > 100 ? '...' : ''}</div>
                ${answeredCount > 0 ? `<div style="color: #4caf50; margin-top: 5px;">✓ 回答了 ${answeredCount} 个问题</div>` : ''}
                <div style="color: #999; font-size: 0.9em; margin-top: 5px;">点击查看详情</div>
            </div>
        `;
    }).join('');
}

// 下载历史记录
function downloadHistory() {
    const dataStr = JSON.stringify(practiceHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `methodology-practice-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// 查看历史记录详情
function viewHistoryDetail(index) {
    const record = practiceHistory[index];
    if (!record) return;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    const answeredQuestions = record.questionAnswers 
        ? record.questionAnswers.filter(qa => qa.answer) 
        : [];
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 40px; max-width: 800px; max-height: 80vh; overflow-y: auto; width: 100%;">
            <h2 style="color: #667eea; margin-bottom: 20px;">${record.methodologyName}</h2>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <div style="color: #999; font-size: 0.9em; margin-bottom: 10px;">
                    ${new Date(record.timestamp).toLocaleString('zh-CN')}
                </div>
                ${record.methodologyCategory ? `<span style="background: #e0e7ff; color: #667eea; padding: 4px 12px; border-radius: 15px; font-size: 0.85em;">${record.methodologyCategory}</span>` : ''}
            </div>
            
            <div style="margin-bottom: 25px;">
                <h3 style="color: #333; margin-bottom: 10px;">📝 问题描述</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; line-height: 1.6;">
                    ${record.context}
                </div>
            </div>
            
            ${answeredQuestions.length > 0 ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #333; margin-bottom: 15px;">💡 问题与回答</h3>
                    ${answeredQuestions.map(qa => `
                        <div style="background: #e8f5e9; padding: 15px; border-radius: 10px; margin-bottom: 15px; border-left: 4px solid #4caf50;">
                            <div style="font-weight: 600; color: #2e7d32; margin-bottom: 8px;">
                                问题 ${qa.questionNumber}: ${qa.question}
                            </div>
                            <div style="color: #555; line-height: 1.6;">
                                ${qa.answer}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${record.reflection ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #333; margin-bottom: 10px;">🌟 收获与反思</h3>
                    <div style="background: #fff3e0; padding: 15px; border-radius: 10px; line-height: 1.6; border-left: 4px solid #ff9800;">
                        ${record.reflection}
                    </div>
                </div>
            ` : ''}
            
            <div style="display: flex; gap: 10px; margin-top: 30px;">
                <button class="btn btn-primary" onclick="downloadSingleRecord(${index})" style="flex: 1;">
                    📥 导出此记录
                </button>
                <button class="btn btn-secondary" onclick="this.closest('[style*=fixed]').remove()" style="flex: 1;">
                    关闭
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 导出单条记录
function downloadSingleRecord(index) {
    const record = practiceHistory[index];
    if (!record) return;
    
    const dataStr = JSON.stringify(record, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${record.methodologyName}-${new Date(record.timestamp).toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// 页面加载时初始化
window.addEventListener('DOMContentLoaded', initApp);
