import { Request } from 'express';

export interface AnalyzeRequest {
  imageData: string;
  variables?: Record<string, any>;
}

export interface ImagePart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

export interface ApiResponse {
  message: string;
  data?: any[];
  status: 'success' | 'partial_success' | 'error';
  error?: string;
}

export interface ExtendedRequest extends Request {
  body: AnalyzeRequest;
}

// Response types for different analysis results
export interface LogicExpressionResult {
  type: 'logic_expression';
  expr: string;
  result: string;
}

export interface CodeConversionResult {
  type: 'code_conversion';
  input_type: string;
  output_type: string;
  input: string;
  result: string;
}

export interface KmapResult {
  type: 'kmap';
  variables: string[];
  minimized_sop: string;
  minimized_pos: string;
  expression_type: string;
}

export interface BinaryArithmeticResult {
  type: 'binary_arithmetic';
  operation: string;
  operand1: string;
  operand2: string;
  result: string;
}

export interface BooleanSimplificationResult {
  type: 'boolean_simplification';
  original: string;
  result: string;
}

export interface RawResponseResult {
  type: 'raw_response';
  result: string;
}

export type AnalysisResult = 
  | LogicExpressionResult 
  | CodeConversionResult 
  | KmapResult 
  | BinaryArithmeticResult 
  | BooleanSimplificationResult 
  | RawResponseResult;