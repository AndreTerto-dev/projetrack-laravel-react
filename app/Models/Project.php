<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'image_path',
        'name',
        'description',
        'status',
        'due_date',
        'created_by',
        'updated_by'
    ];

    /**
     * Get the tasks for the project.
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Get the user that created the project.
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user that updated the project.
     */
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
