
export const FormatReal = (n) => {return parseInt(n).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}

export const FormatTel = (n) => { if (n) return n.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") }

export const FormatFormaPag = (x) => {
    switch (x) {
        case 'DH':
            return "Dinheiro"
        case 'CC':
            return 'Cartão de Crédito'
        case 'CD':
            return 'Cartão de Débito'
        case 'DP':
            return 'PIX'
        case 'FO':
            return 'Folha de Pagamento'
        case 'VE':
            return 'Voucher Exagerado'
    }
}

export const FormatCPF = (n) => {return n.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}