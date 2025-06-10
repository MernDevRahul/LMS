import React from 'react';

export default function EditButton({ handleEdit, item }) {
    return (
        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(item)}>
            <i className="bi bi-pencil-square"></i>
        </button>
    );
}
