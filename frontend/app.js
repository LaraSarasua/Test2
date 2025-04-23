const API_URL = 'http://localhost:3001/api/notes';
const noteForm = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
let editingId = null;

noteForm.addEventListener('submit', async e => {
  e.preventDefault();
  const data = { 
    title: titleInput.value, 
    content: contentInput.value, 
    category: document.getElementById('category').value,
  };
  if (editingId) {
    await fetch(`${API_URL}/${editingId}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    editingId = null;
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
  }
  noteForm.reset();
  loadNotes();
});

const categoryFilter = document.getElementById('category-filter');

async function loadNotes() {
  notesList.innerHTML = '';
  const notes = await (await fetch(API_URL)).json();

  const selectedCategory = categoryFilter.value;

  const categories = [...new Set(notes.map(n => n.category).filter(Boolean))];
  categoryFilter.innerHTML = '<option value="">All Categories</option>';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });

  categoryFilter.value = selectedCategory; 
  console.log('Selected category:', selectedCategory);
  notes
    .filter(n => !n.isArchived) 
    .filter(n => !selectedCategory || n.category === selectedCategory) 
    .forEach(renderNote);
}

categoryFilter.addEventListener('change', loadNotes);  

async function loadArchivedNotes() {
  notesList.innerHTML = '';
  const notes = await (await fetch(API_URL)).json();
  notes.filter(n => n.isArchived).forEach(renderNote);
}

function renderNote(n) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${n.title}</strong>: ${n.content}
    <button onclick="toggleArchive(${n.id})">
      ${n.isArchived ? 'Unfile' : 'Archive'}
    </button>
    <button onclick="deleteNote(${n.id})">Delete</button>
    <button onclick='startEditing(${n.id}, ${JSON.stringify(n.title)}, ${JSON.stringify(n.content)}, ${JSON.stringify(n.category)})'>
      Modify 
    </button>
  `;
  notesList.appendChild(li);
}

async function toggleArchive(id) {
  await fetch(`${API_URL}/${id}/archive`, { method: 'PATCH' });
  loadNotes();
}

async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadNotes();
}

function startEditing(id, title, content, category) {
  editingId = id;
  titleInput.value = title;
  contentInput.value = content;
  document.getElementById('category').value = category || ''; 
}
  

loadNotes();
