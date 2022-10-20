export const FormatadorService = {
    valorMonetario(value: number): string {
        return value.toLocaleString(
            'pt-BR', 
            { 
                minimumFractionDigits: 2, 
                style: 'currency', 
                currency: 'BRL' 
            }
        );
    },
    limitarTexto(text: string, maxLength: number): string {
        if (text.length < maxLength) {
            return text;
        }

        return text.slice(0, maxLength) + '...';
    }
}