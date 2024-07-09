// Funcionalidade para aplicar um darkMode na página. Por padrão, será dark e o botão dará opção de deixar white.
document.getElementById('whiteMode').addEventListener('click', function() {
    document.documentElement.classList.toggle('white-mode');
});


// objeto em js - {}
const atividade = {
    nome: 'Almoço',
    data: new Date('2024-07-09 12:00'),
    finalizada: true
}
// Este é um objeto separado do array atividades para estudarmos/entendermos objetos em js, mas é fácil dar Ctrl + X da linha 3 a 4 e colocar dentro de atividades.

// lista, array, vetor em js - []
const atividades = [
    atividade,
    {
        nome: 'Academia em grupo',
        data: new Date('2024-07-10 08:00'),
        finalizada: false
    },
    {
        nome: 'Natação',
        data: new Date('2024-07-15 15:00'),
        finalizada: true
    }
]

// arrow function
const criarItemAtividade = (atividade) => {
    let input = '<input type="checkbox"'

    if(atividade.finalizada) {
        input += 'checked'
    }

    // input = input + '>'
    // No lugar de concatenar variáveis dessa forma acima, podemos usar += para poupar tempo.
    // Faça o teste :) comente a linha 34 e descomente a linha 31. Dá na mesma, mas uma é mais bonita e rápida que a outra.
    input += '>'

    return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>${atividade.data}</time>
    </div>
    `
}

const section = document.querySelector('section')

for(let atividade of atividades) {
    section.innerHTML += criarItemAtividade(atividade)
}




