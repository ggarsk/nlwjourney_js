// Funcionalidade para aplicar um whiteMode na página. Por padrão, será dark e o botão dará opção de deixar white.
const btn = document.getElementById('whiteMode')
const title = document.querySelector('h1')

btn.addEventListener('click', function() {
    document.documentElement.classList.toggle('white-mode')
    btn.classList.toggle('dark-mode')
    title.classList.toggle('white-mode')
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
    let input = `<input onchange="concluirAtividade(event)" value="${atividade.data}" type="checkbox"`

    if(atividade.finalizada) {
        input += 'checked'
    }

    // input = input + '>'
    // No lugar de concatenar variáveis dessa forma acima, podemos usar += para poupar tempo.
    // Faça o teste :) comente a linha 34 e descomente a linha 31. Dá na mesma, mas uma é mais bonita e rápida que a outra.
    input += '>'

    const formatar = formatador(atividade.data)

    return `
    <div class="card-bg">
        ${input}

        <div>
            <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.50002 10.0001L9.16669 11.6667L12.5 8.33341M18.3334 10.0001C18.3334 14.6025 14.6024 18.3334 10 18.3334C5.39765 18.3334 1.66669 14.6025 1.66669 10.0001C1.66669 5.39771 5.39765 1.66675 10 1.66675C14.6024 1.66675 18.3334 5.39771 18.3334 10.0001Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.41658 1.8183C9.46243 1.6159 10.5374 1.6159 11.5832 1.8183M11.5832 18.1816C10.5374 18.384 9.46243 18.384 8.41658 18.1816M14.6741 3.1008C15.5586 3.70016 16.3197 4.46403 16.9157 5.3508M1.81824 11.5833C1.61584 10.5374 1.61584 9.46249 1.81824 8.41664M16.8991 14.6741C16.2997 15.5587 15.5359 16.3197 14.6491 16.9158M18.1816 8.41664C18.384 9.46249 18.384 10.5374 18.1816 11.5833M3.10074 5.3258C3.70009 4.44124 4.46397 3.6802 5.35074 3.08414M5.32574 16.8991C4.44118 16.2998 3.68014 15.5359 3.08408 14.6491" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <span>${atividade.nome}</span>
        </div>

        <time class="short">
            ${formatar.dia.semana.curto}.
            ${formatar.dia.numerico} <br>
            ${formatar.hora}
        </time>
        <time class="full">
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

    const novaAtividade = {
        nome,
        data,
        finalizada: false
    }

    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if(atividadeExiste) {
        return alert('Dia/Hora não disponível')
    }

    atividades = [novaAtividade, ...atividades]
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
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }

    document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}

criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataInput = input.value

    const atividade = atividades.find((atividade) => {
        return atividade.data == dataInput
    })

    if(!atividade) {
        return
    }

    atividade.finalizada = !atividade.finalizada
}
