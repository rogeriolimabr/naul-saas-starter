export const formatCNPJ = (cnpj: string, hidden: boolean = false): string => {
  // Remove qualquer caractere que não seja dígito
  const cleanCNPJ = cnpj.replace(/\D/g, '')

  // Verifica se o CNPJ tem 14 dígitos
  if (cleanCNPJ.length !== 14) {
    throw new Error('CNPJ inválido')
  }

  if (hidden) {
    // Formata o CNPJ usando regex para colocar os pontos, barra e hífen
    return cleanCNPJ.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.***.***/$4-$5'
    )
  }

  // Formata o CNPJ usando regex para colocar os pontos, barra e hífen
  return cleanCNPJ.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  )
}
