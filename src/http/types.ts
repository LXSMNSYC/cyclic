/**
 * @license
 * MIT License
 *
 * Copyright (c) 2020 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2020
 */
import { IncomingMessage, ServerResponse } from 'http';
import https from 'https';
import { Context } from '../types';
import { Stack, Middleware, Listener } from '../stack';
import { CachedRadix } from '../cached-radix';

export interface HTTPContext extends Context {
  request: IncomingMessage;
  response: ServerResponse;
}

export type HTTPMiddleware = Middleware<HTTPContext>;
export type HTTPListener = Listener<HTTPContext>;
export type HTTPStack = Stack<HTTPContext>;

export interface HTTPHandler {
  tree: CachedRadix<HTTPStack>;
  radixPaths: string[];
}

export type HTTPErrorHandler = (ctx: HTTPContext, error: Error) => string | Promise<string>;

export interface HTTPConfig {
  https?: https.ServerOptions;
  host: string;
  port: number;
  globalMiddleware: HTTPMiddleware[];
  errorHandlers: Map<number, HTTPErrorHandler>;
  env: string;
}
