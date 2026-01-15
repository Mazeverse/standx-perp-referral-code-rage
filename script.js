const copyCodeBtn = document.getElementById('copyCodeBtn');
const hint = document.getElementById('hint');
const refCodeEl = document.getElementById('refCode');

function setHint(msg){
  hint.textContent = msg;
  window.clearTimeout(setHint._t);
  setHint._t = window.setTimeout(() => { hint.textContent = ''; }, 2500);
}

async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
    return true;
  }catch(e){
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

copyCodeBtn?.addEventListener('click', async () => {
  const code = refCodeEl?.dataset?.code || refCodeEl?.textContent?.trim() || '';
  const ok = await copyText(code);
  setHint(ok ? 'Copied invite code.' : 'Copy failed. Please copy manually.');
});
