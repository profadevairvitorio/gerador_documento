let termsAccepted = false;

function openModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function acceptTerms() {
    termsAccepted = true;
    closeModal();
    generateDocument();
}

function generateDocument() {
    if (!termsAccepted) {
        openModal();
        return;
    }
    const docType = document.getElementById('docType').value;
    let generatedDoc = '';
    switch (docType) {
        case 'cpf':
            generatedDoc = generateCPF();
            break;
        case 'cnpj':
            generatedDoc = generateCNPJ();
            break;
        case 'rfc':
            generatedDoc = generateRFC();
            break;
        case 'curp':
            generatedDoc = generateCURP();
            break;
        default:
            generatedDoc = 'Tipo de documento desconhecido';
    }
    document.getElementById('generatedDoc').innerText = generatedDoc;
}

function generateCPF() {
    const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 9)).join('');
    const d1 = calculateCPFVerifier(n, 10);
    const d2 = calculateCPFVerifier(n + d1, 11);
    return `${n.substring(0, 3)}.${n.substring(3, 6)}.${n.substring(6, 9)}-${d1}${d2}`;
}

function calculateCPFVerifier(n, weight) {
    let sum = 0;
    for (let i = 0; i < n.length; i++) {
        sum += n[i] * (weight - i);
    }
    const mod = (sum * 10) % 11;
    return mod === 10 ? 0 : mod;
}

function generateCNPJ() {
    const n = Array.from({ length: 8 }, () => Math.floor(Math.random() * 9)).join('') + '0001';
    const d1 = calculateCNPJVerifier(n, 5);
    const d2 = calculateCNPJVerifier(n + d1, 6);
    return `${n.substring(0, 2)}.${n.substring(2, 5)}.${n.substring(5, 8)}/0001-${d1}${d2}`;
}

function calculateCNPJVerifier(n, weight) {
    let sum = 0;
    let pos = weight;
    for (let i = 0; i < n.length; i++) {
        sum += n[i] * pos--;
        if (pos < 2) pos = 9;
    }
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
}

function generateRFC() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 13 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function generateCURP() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 18 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function copyToClipboard() {
    const doc = document.getElementById('generatedDoc').innerText;
    navigator.clipboard.writeText(doc).then(() => {
        alert('Documento copiado!');
    }, () => {
        alert('Erro ao copiar documento.');
    });
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
