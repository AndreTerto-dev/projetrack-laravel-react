<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'max:255',
            ],
            'image' => [
                'nullable',
                'image',
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'due_date' => [
                'nullable',
                'date',
            ],
            'status' => [
                'required',
                Rule::in(['pending', 'in_progress', 'completed']),
            ],
        ];
    }
}
