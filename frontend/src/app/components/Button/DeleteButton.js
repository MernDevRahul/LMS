import React from 'react';

export default function DeleteButton({ handleDelete, id }) {
    return (
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(id)}>
            <i className="bi bi-trash"></i>
        </button>
    );
}
