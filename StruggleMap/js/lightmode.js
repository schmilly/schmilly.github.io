
    (function () {
        var KEY = 'dm-theme';
        var stored = null;
        try { stored = localStorage.getItem(KEY); } catch (e) {}
        var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        var theme = stored || (prefersLight ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', theme);

        window.__dmTheme = {
            key: KEY,
            get: function () { return document.documentElement.getAttribute('data-theme') || 'dark'; },
     set: function (t) {
         document.documentElement.setAttribute('data-theme', t);
         try { localStorage.setItem(KEY, t); } catch (e) {}
         window.dispatchEvent(new CustomEvent('dm:themechange', { detail: { theme: t } }));
     },
     toggle: function () { this.set(this.get() === 'dark' ? 'light' : 'dark'); }
        };

        function syncButton() {
            var btn = document.getElementById('theme-toggle');
            if (!btn) return;
            var t = window.__dmTheme.get();
            var icon = btn.querySelector('.theme-icon');
            if (icon) icon.textContent = t === 'light' ? '☽' : '☀';
            btn.setAttribute('aria-pressed', String(t === 'light'));
            var label = t === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
            btn.setAttribute('aria-label', label);
            btn.title = label;
        }

        document.addEventListener('DOMContentLoaded', function () {
            var btn = document.getElementById('theme-toggle');
            if (btn) {
                btn.addEventListener('click', function () {
                    window.__dmTheme.toggle();
                    syncButton();
                });
            }
            syncButton();
        });
    })();
