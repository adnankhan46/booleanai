export function generatePrompt(variables: Record<string, any> = {}): string {
    return `You have been given an image with digital electronics questions or circuit problems to solve.
    Based on the problem in the image, return only the appropriate JSON object in plain text (do not use backticks or the word 'json').
    Understand the text and numbers from image properly, also if it is a K-Map then make proper coordinates and then give correct answer
The types of questions may include:

1. Logic Gate Expressions:
Return format: {"type": "logic_expression", "expr": "original expression", "result": "simplified expression"}

2. Code Conversions (BCD, Excess-3, etc.):
Return format: {"type": "code_conversion", "input_type": "BCD", "output_type": "Excess-3", "input": "input value", "result": "converted value"}

3. K-maps:
Return format: {"type": "kmap", "variables": ["A", "B", "C"], "minimized_sop": "simplified SOP", "minimized_pos": "simplified POS", "expression_type": "SOP"}

4. Binary Arithmetic:
Return format: {"type": "binary_arithmetic", "operation": "addition", "operand1": "1010", "operand2": "0101", "result": "1111"}

5. Boolean Algebra:
Return format: {"type": "boolean_simplification", "original": "original expression", "result": "simplified expression"}

Analyze the problem in the image and return ONLY the appropriate JSON object.
Make sure do not use backticks and json names, give only return values as json like object,

now based on the question type,
Use proper escape characters for special symbols. Use 'exclamation mark' for showing 'not' or 'complement'
If any variables are provided, use their values: ${JSON.stringify(variables)}`;
}