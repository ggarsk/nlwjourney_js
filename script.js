// objeto em js - {}
const atividade = {
    nome: 'Almoço',
    data: new Date('2024-07-09 10:00'),
    finalizada: false
}

// arrow function
const criarItemAtividade = (atividade) => {
    let input = '<input type="checkbox"'

    if(atividade.finalizada) {
        input = input + 'checked'
    }

    input = input + '>'

    return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>${atividade.data}</time>
    </div>
    `
}

const section = document.querySelector('section')
section.innerHTML = criarItemAtividade(atividade)

