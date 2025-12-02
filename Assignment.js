      let assignments = [];
        let currentFilter = 'all';
        let currentSort = 'dueDate';

        // Set min date to today
        document.getElementById('dueDate').min = new Date().toISOString().split('T')[0];

        // Add assignment
        document.getElementById('addForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const assignment = {
                id: Date.now(),
                title: document.getElementById('title').value,
                subject: document.getElementById('subject').value,
                dueDate: document.getElementById('dueDate').value,
                priority: document.getElementById('priority').value,
                status: document.getElementById('status').value,
                description: document.getElementById('description').value,
                completed: document.getElementById('status').value === 'completed'
            };
            
            assignments.push(assignment);
            this.reset();
            updateUI();
        });

        // Toggle completion
        function toggleComplete(id) {
            const assignment = assignments.find(a => a.id === id);
            assignment.completed = !assignment.completed;
            assignment.status = assignment.completed ? 'completed' : 'in-progress';
            updateUI();
        }

        // Delete assignment
        function deleteAssignment(id) {
            if (confirm('Are you sure you want to delete this assignment?')) {
                assignments = assignments.filter(a => a.id !== id);
                updateUI();
            }
        }

        // Edit assignment (simplified)
        function editAssignment(id) {
            const assignment = assignments.find(a => a.id === id);
            alert(`Edit functionality for:\n"${assignment.title}"\n\nIn a full app, this would open an edit modal.`);
        }

        // Filter assignments
        function filterAssignments(filter) {
            currentFilter = filter;
            document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
            updateUI();
        }

        // Sort assignments
        function sortAssignments(sort) {
            currentSort = sort;
            updateUI();
        }

        // Get filtered assignments
        function getFilteredAssignments() {
            let filtered = [...assignments];
            const today = new Date().toISOString().split('T')[0];
            const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            
            switch(currentFilter) {
                case 'today':
                    filtered = filtered.filter(a => a.dueDate === today);
                    break;
                case 'week':
                    filtered = filtered.filter(a => a.dueDate >= today && a.dueDate <= weekFromNow);
                    break;
                case 'completed':
                    filtered = filtered.filter(a => a.completed);
                    break;
                case 'pending':
                    filtered = filtered.filter(a => !a.completed);
                    break;
            }
            
            // Sort
            filtered.sort((a, b) => {
                if (currentSort === 'dueDate') {
                    return new Date(a.dueDate) - new Date(b.dueDate);
                } else if (currentSort === 'priority') {
                    const priorityOrder = { high: 1, medium: 2, low: 3 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                } else if (currentSort === 'subject') {
                    return a.subject.localeCompare(b.subject);
                }
            });
            
            return filtered;
        }

        // Update UI
        function updateUI() {
            const filtered = getFilteredAssignments();
            const listEl = document.getElementById('assignmentsList');
            
            if (filtered.length === 0) {
                listEl.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📝</div>
                        <p>No assignments found for this filter</p>
                    </div>
                `;
            } else {
                listEl.innerHTML = filtered.map(a => {
                    const daysUntil = Math.ceil((new Date(a.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                    const isOverdue = daysUntil < 0 && !a.completed;
                    
                    return `
                        <div class="assignment-card ${a.completed ? 'completed' : ''}">
                            <input type="checkbox" class="assignment-checkbox" 
                                   ${a.completed ? 'checked' : ''} 
                                   onchange="toggleComplete(${a.id})">
                            <div class="assignment-content">
                                <div class="assignment-header">
                                    <div class="assignment-title">${a.title}</div>
                                </div>
                                <div class="assignment-meta">
                                    <span class="meta-badge badge-subject">${a.subject}</span>
                                    <span class="meta-badge badge-priority ${a.priority}">${a.priority.charAt(0).toUpperCase() + a.priority.slice(1)} Priority</span>
                                    <span class="meta-badge badge-date">📅 ${new Date(a.dueDate).toLocaleDateString()}</span>
                                    <span class="badge-status status-${a.status}">${a.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                                    ${isOverdue ? '<span class="meta-badge badge-priority high">⚠️ Overdue</span>' : ''}
                                </div>
                                ${a.description ? `<div class="assignment-description">${a.description}</div>` : ''}
                                <div class="assignment-actions">
                                    <button class="action-btn btn-edit" onclick="editAssignment(${a.id})">✏️ Edit</button>
                                    <button class="action-btn btn-delete" onclick="deleteAssignment(${a.id})">🗑️ Delete</button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
            }
            
            // Update stats
            const completed = assignments.filter(a => a.completed).length;
            const pending = assignments.filter(a => !a.completed).length;
            const overdue = assignments.filter(a => {
                const daysUntil = Math.ceil((new Date(a.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                return daysUntil < 0 && !a.completed;
            }).length;
            
            document.getElementById('totalCount').textContent = assignments.length;
            document.getElementById('completedCount').textContent = completed;
            document.getElementById('pendingCount').textContent = pending;
            document.getElementById('overdueCount').textContent = overdue;
            
            // Update AI suggestion
            updateAISuggestion();
            
            // Update upcoming deadlines
            updateDeadlines();
        }

        // Update AI suggestion
        function updateAISuggestion() {
            const pending = assignments.filter(a => !a.completed).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            const aiEl = document.getElementById('aiSuggestion');
            
            if (pending.length === 0) {
                aiEl.innerHTML = `
                    <div class="ai-icon">🎉</div>
                    <div class="ai-title">Great Work!</div>
                    <div class="ai-text">You're all caught up! No pending assignments.</div>
                `;
            } else {
                const next = pending[0];
                const daysUntil = Math.ceil((new Date(next.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                const urgency = daysUntil <= 1 ? 'urgently' : daysUntil <= 3 ? 'soon' : 'first';
                
                aiEl.innerHTML = `
                    <div class="ai-icon">🤖</div>
                    <div class="ai-title">AI Tip</div>
                    <div class="ai-text">You should ${urgency} finish your <strong>${next.subject}</strong> assignment — it's due in ${daysUntil} ${daysUntil === 1 ? 'day' : 'days'}!</div>
                `;
            }
        }

        // Update upcoming deadlines
        function updateDeadlines() {
            const upcoming = assignments
                .filter(a => !a.completed)
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .slice(0, 5);
            
            const listEl = document.getElementById('deadlinesList');
            
            if (upcoming.length === 0) {
                listEl.innerHTML = '<p style="color: #9ca3af; text-align: center;">No upcoming deadlines</p>';
            } else {
                listEl.innerHTML = upcoming.map(a => {
                    const daysUntil = Math.ceil((new Date(a.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                    const dateText = daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`;
                    
                    return `
                        <div class="deadline-item">
                            <div class="deadline-title">${a.title}</div>
                            <div class="deadline-date">${dateText} • ${a.subject}</div>
                        </div>
                    `;
                }).join('');
            }
        }

        // Initialize
        updateUI();