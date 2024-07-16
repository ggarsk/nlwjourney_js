// Funcionalidade para aplicar um whiteMode na página. Por padrão, será dark e o botão dará opção de deixar white.
const btn = document.getElementById('whiteMode')

btn.addEventListener('click', function() {
    document.documentElement.classList.toggle('white-mode')
    btn.classList.toggle('dark-mode')
})

// Funcionalidade para formatar data e hora
const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}


// objeto em js - {}
const atividade = {
    nome: 'Almoço',
    data: new Date('2024-07-09 12:00'),
    finalizada: true
}
// Este é um objeto separado do array atividades para estudarmos/entendermos objetos em js, mas é fácil dar Ctrl + X da linha 3 a 4 e colocar dentro de atividades.

// lista, array, vetor em js - []
let atividades = [
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

// atividades = []

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

    const formatar = formatador(atividade.data)

    return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>
        ${formatar.dia.semana.longo},
        dia ${formatar.dia.numerico}
        de ${formatar.mes}
        às ${formatar.hora}h
        </time>
    </div>
    `
}

// Funcionalidade para atualizar a lista de atividades e retornar mensagem de status se a lista estiver limpa
const atualizarListaAtv = () => {
    const section = document.querySelector('section')
    section.innerHTML = ''

    // verificar se a lista está vazia
    if(atividades.length == 0){
        section.innerHTML = `<p>Nenhuma atividade cadastrada</p>`
        return
    }

    for(let atividade of atividades) {
        section.innerHTML += criarItemAtividade(atividade)
    }

}

atualizarListaAtv()

// Funcionalidade para adicionar atividades na lista de atividades
const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)

    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    const atividade = {
        nome,
        data,
        finalizada: false
    }

    atividades = [atividade, ...atividades]
    atualizarListaAtv()
}

// Funcionalidade para criar opção de dias para agendar as atividades
const criarDiasSelecao = () => {
    const dias = [
        '2024-07-28',
        '2024-08-03',
        '2024-08-15',
        '2024-08-21',
        '2024-08-28',
        '2024-09-10'
    ]

    let diasSelecao = ''

    for (let dia of dias){
        const formatar = formatador(dia)
        const diaFormatado = `
        ${formatar.dia.numerico} de
        ${formatar.mes}
        `
        diasSelecao += `
        <option value="${dia}">${diaFormatado}</option>
        `
    }

    document.querySelector('select[name="dia"]').innerHTML = diasSelecao
}

criarDiasSelecao()

// Funcionalidade para criar opção de horas para agendar as atividades
const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    for(let i = 6; i < 23; i++) {
        horasDisponiveis += `<option value="${i}:00">${i}:00</option>`
        horasDisponiveis += `<option value="${i}:30">${i}:30</option>`
    }

    document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}

criarHorasSelecao()
