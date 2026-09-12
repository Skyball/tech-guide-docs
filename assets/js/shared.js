var SITE = {
  base: '/tech-guide-docs',
  title: 'AI Engineer 知识库',
  categories: [
    {
      id: 'ai', label: 'AI & LLM', icon: '🤖',
      docs: [
        { slug: 'ai-agent-engineering-guide', title: 'AI Agent 架构总指南', priority: 'P0', keywords: ['Agent', 'LangGraph', 'RAG', 'Docker', 'K8s'] },
        { slug: 'llm-fundamentals-guide', title: 'LLM 原理指南', priority: 'P0', keywords: ['Transformer', 'Attention', 'Tokenization', '解码'] },
        { slug: 'llm-eval-cost-guide', title: 'LLM 评估 + 成本优化', priority: 'P1', keywords: ['RAGAS', 'Token', '成本', 'A/B 测试'] },
        { slug: 'pi-agent-reading-guide', title: 'Pi Agent 源码阅读指南', priority: 'P0', keywords: ['Agent', '源码', '架构', '事件流'] }
      ]
    },
    {
      id: 'lang', label: '编程语言', icon: '💻',
      docs: [
        { slug: 'python-engineering-guide', title: 'Python 工程实战指南', priority: 'P0', keywords: ['Python', 'FastAPI', '异步', '并发'] },
        { slug: 'go-engineering-guide', title: 'Go 语言工程指南', priority: 'P0', keywords: ['Go', 'Gin', 'GORM', '并发', 'goroutine'] }
      ]
    },
    {
      id: 'backend', label: '后端基础设施', icon: '🏗️',
      docs: [
        { slug: 'database-advanced-guide', title: '数据库进阶', priority: 'P2', keywords: ['索引', 'SQL', '事务', 'Redis', 'B+Tree'] },
        { slug: 'message-queue-guide', title: '消息队列深入', priority: 'P2', keywords: ['Kafka', 'RabbitMQ', 'Redis Streams'] },
        { slug: 'grpc-guide', title: 'gRPC / Protocol Buffers', priority: 'P1', keywords: ['gRPC', 'Protobuf', 'Go', 'Python'] }
      ]
    },
    {
      id: 'plan', label: '学习计划', icon: '📅',
      docs: [
        { slug: 'learning-week1', title: 'Week 1 — 跑通 Demo', keywords: ['LangChain', 'RAG', 'FastAPI'] },
        { slug: 'learning-week2', title: 'Week 2 — 做深做精', keywords: ['深入', '优化'] },
        { slug: 'learning-week3', title: 'Week 3 — 面试冲刺', keywords: ['面试', '系统设计'] },
        { slug: 'learning-week4', title: 'Week 4 — LLM + Go + Pi', keywords: ['LLM', 'Go', 'Pi Agent'] },
        { slug: 'learning-week5', title: 'Week 5 — 评估 + 模拟面试', keywords: ['评估', '模拟'] }
      ]
    }
  ]
};

function getDocUrl(categoryId, slug) {
  return SITE.base + '/guides/' + categoryId + '/' + slug + '.html';
}

function getCurrentDoc() {
  var path = location.pathname;
  var i, j, cat, doc, url;
  for (i = 0; i < SITE.categories.length; i++) {
    cat = SITE.categories[i];
    for (j = 0; j < cat.docs.length; j++) {
      doc = cat.docs[j];
      url = getDocUrl(cat.id, doc.slug);
      if (path === url || path.indexOf(url) !== -1) {
        return {
          category: cat,
          doc: doc,
          categoryIndex: i,
          docIndex: j
        };
      }
    }
  }
  return null;
}

function isHomePage() {
  var path = location.pathname;
  if (path === SITE.base || path === SITE.base + '/') return true;
  if (path === SITE.base + '/index.html') return true;
  if (path.endsWith('/index.html') && path.indexOf(SITE.base) !== -1) return true;
  return false;
}

function getAllDocs() {
  var all = [];
  var i, j, cat;
  for (i = 0; i < SITE.categories.length; i++) {
    cat = SITE.categories[i];
    for (j = 0; j < cat.docs.length; j++) {
      all.push({
        category: cat,
        doc: cat.docs[j],
        categoryIndex: i,
        docIndex: j
      });
    }
  }
  return all;
}

function initSidebar() {
  var sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  var current = getCurrentDoc();
  var html = '';
  var i, j, cat, doc, isOpen, isActive, priorityClass, priorityHtml;

  html += '<a class="sidebar-brand" href="' + SITE.base + '/index.html">' + SITE.title + '</a>';
  html += '<a class="sidebar-home' + (isHomePage() ? ' active' : '') + '" href="' + SITE.base + '/index.html">🏛 首页</a>';

  html += '<div class="sidebar-search-wrap">';
  html += '<input type="text" class="sidebar-search" id="sidebarSearch" placeholder="🔍 搜索文档..." autocomplete="off">';
  html += '<div class="sidebar-search-results" id="sidebarSearchResults"></div>';
  html += '</div>';

  for (i = 0; i < SITE.categories.length; i++) {
    cat = SITE.categories[i];
    isOpen = current && current.category.id === cat.id;
    html += '<div class="sidebar-category' + (isOpen ? ' open' : '') + '" data-category="' + cat.id + '">';
    html += '<span class="sidebar-category-left">';
    html += '<span class="sidebar-arrow">▸</span>';
    html += '<span>' + cat.icon + ' ' + cat.label + '</span>';
    html += '</span>';
    html += '<span class="sidebar-badge">' + cat.docs.length + '</span>';
    html += '</div>';

    html += '<div class="sidebar-doc-list"' + (isOpen ? ' style="max-height:600px"' : '') + '>';
    for (j = 0; j < cat.docs.length; j++) {
      doc = cat.docs[j];
      isActive = current && current.doc.slug === doc.slug && current.category.id === cat.id;
      priorityHtml = '';
      if (doc.priority) {
        priorityClass = doc.priority.toLowerCase();
        priorityHtml = '<span class="sidebar-priority ' + priorityClass + '">' + doc.priority + '</span>';
      }
      html += '<a class="sidebar-doc-link' + (isActive ? ' active' : '') + '" href="' + getDocUrl(cat.id, doc.slug) + '">';
      html += '<span>' + doc.title + '</span>' + priorityHtml;
      html += '</a>';
    }
    html += '</div>';
  }

  html += '<div class="sidebar-divider"></div>';
  html += '<button class="sidebar-theme-toggle" id="sidebarThemeToggle" type="button">';
  html += '<span id="sidebarThemeIcon">🌙</span> <span id="sidebarThemeText">暗色模式</span>';
  html += '</button>';
  html += '<noscript><p style="padding:12px 20px;font-size:.85rem"><a href="' + SITE.base + '/index.html">返回首页</a></p></noscript>';

  sidebar.innerHTML = html;

  var categories = sidebar.querySelectorAll('.sidebar-category');
  for (i = 0; i < categories.length; i++) {
    categories[i].addEventListener('click', function () {
      this.classList.toggle('open');
      var list = this.nextElementSibling;
      if (list && list.classList.contains('sidebar-doc-list')) {
        if (this.classList.contains('open')) {
          list.style.maxHeight = '600px';
        } else {
          list.style.maxHeight = '0';
        }
      }
    });
  }
}

function initSearch() {
  var input = document.getElementById('sidebarSearch');
  var results = document.getElementById('sidebarSearchResults');
  if (!input || !results) return;

  input.addEventListener('input', function () {
    var query = this.value.trim().toLowerCase();
    if (!query) {
      results.classList.remove('visible');
      results.innerHTML = '';
      return;
    }

    var matches = [];
    var i, j, cat, doc, k, kw;
    for (i = 0; i < SITE.categories.length; i++) {
      cat = SITE.categories[i];
      for (j = 0; j < cat.docs.length; j++) {
        doc = cat.docs[j];
        if (doc.title.toLowerCase().indexOf(query) !== -1) {
          matches.push({ category: cat, doc: doc });
          continue;
        }
        if (doc.keywords) {
          for (k = 0; k < doc.keywords.length; k++) {
            kw = doc.keywords[k];
            if (kw.toLowerCase().indexOf(query) !== -1) {
              matches.push({ category: cat, doc: doc });
              break;
            }
          }
        }
      }
    }

    if (matches.length === 0) {
      results.innerHTML = '<div class="sidebar-search-result" style="cursor:default;color:rgba(148,163,184,0.6)">无匹配结果</div>';
      results.classList.add('visible');
      return;
    }

    var html = '';
    for (i = 0; i < matches.length && i < 10; i++) {
      html += '<a class="sidebar-search-result" href="' + getDocUrl(matches[i].category.id, matches[i].doc.slug) + '">';
      html += matches[i].doc.title;
      html += '<span class="sidebar-search-result-cat">' + matches[i].category.label + '</span>';
      html += '</a>';
    }
    results.innerHTML = html;
    results.classList.add('visible');
  });

  input.addEventListener('blur', function () {
    setTimeout(function () {
      results.classList.remove('visible');
    }, 200);
  });

  input.addEventListener('focus', function () {
    if (results.innerHTML) {
      results.classList.add('visible');
    }
  });
}

function initThemeToggle() {
  var btn = document.getElementById('sidebarThemeToggle');
  var icon = document.getElementById('sidebarThemeIcon');
  var text = document.getElementById('sidebarThemeText');
  if (!btn) return;

  var saved = localStorage.getItem('ai-guide-theme');
  var isDark = saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (icon) icon.textContent = '☀️';
      if (text) text.textContent = '亮色模式';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (icon) icon.textContent = '🌙';
      if (text) text.textContent = '暗色模式';
    }
  }

  applyTheme(isDark);

  btn.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (dark) {
      applyTheme(false);
      localStorage.setItem('ai-guide-theme', 'light');
    } else {
      applyTheme(true);
      localStorage.setItem('ai-guide-theme', 'dark');
    }
  });
}

function initScrollAnimation() {
  var els = document.querySelectorAll('.animate-in');
  if (!els.length || !window.IntersectionObserver) {
    for (var i = 0; i < els.length; i++) {
      els[i].classList.add('visible');
    }
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  for (var j = 0; j < els.length; j++) {
    obs.observe(els[j]);
  }
}

function initProgressBar() {
  var bar = document.querySelector('.progress-bar-top');
  if (!bar) return;

  function update() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initBreadcrumb() {
  var el = document.getElementById('breadcrumb');
  if (!el) return;

  if (isHomePage()) {
    el.innerHTML = '';
    return;
  }

  var current = getCurrentDoc();
  if (!current) {
    el.innerHTML = '';
    return;
  }

  var html = '';
  html += '<a href="' + SITE.base + '/index.html">首页</a>';
  html += '<span class="breadcrumb-sep">&gt;</span>';
  html += '<span>' + current.category.label + '</span>';
  html += '<span class="breadcrumb-sep">&gt;</span>';
  html += '<span class="breadcrumb-current">' + current.doc.title + '</span>';
  el.innerHTML = html;
}

function initPageNav() {
  var el = document.getElementById('page-nav');
  if (!el) return;

  if (isHomePage()) {
    el.innerHTML = '';
    return;
  }

  var current = getCurrentDoc();
  if (!current) {
    el.innerHTML = '';
    return;
  }

  var docs = current.category.docs;
  var idx = current.docIndex;
  var html = '';

  if (idx > 0) {
    html += '<a class="page-nav-link prev" href="' + getDocUrl(current.category.id, docs[idx - 1].slug) + '">';
    html += '<span class="page-nav-label">← 上一篇</span>';
    html += '<span class="page-nav-title">' + docs[idx - 1].title + '</span>';
    html += '</a>';
  } else {
    html += '<span></span>';
  }

  if (idx < docs.length - 1) {
    html += '<a class="page-nav-link next" href="' + getDocUrl(current.category.id, docs[idx + 1].slug) + '">';
    html += '<span class="page-nav-label">下一篇 →</span>';
    html += '<span class="page-nav-title">' + docs[idx + 1].title + '</span>';
    html += '</a>';
  }

  el.innerHTML = html;
}

function initMobileMenu() {
  var toggle = document.getElementById('mobileMenuToggle');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebarOverlay');
  if (!toggle || !sidebar) return;

  function closeMenu() {
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
  }

  function openMenu() {
    sidebar.classList.add('open');
    if (overlay) overlay.classList.add('visible');
  }

  toggle.addEventListener('click', function () {
    if (sidebar.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  var links = sidebar.querySelectorAll('.sidebar-doc-link, .sidebar-home, .sidebar-search-result');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', closeMenu);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initSidebar();
  initSearch();
  initThemeToggle();
  initScrollAnimation();
  initProgressBar();
  initBreadcrumb();
  initPageNav();
  initMobileMenu();
});
