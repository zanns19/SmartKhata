import React, { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';



const Manager = ({ bgColor }) => {
    const getKhata = async () => {
        let req = await fetch("http://localhost:3000/");
        let khata = await req.json();

        console.log(khata);
        setFormArray(khata);
    };

    useEffect(() => {
        getKhata();
    }, []);

    const [form, setForm] = useState({ name: '', note: '', date: '', amount: '' })
    const [formArray, setFormArray] = useState([])
    const [editId, setEditId] = useState(null);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const saveButton = async (e) => {
        e.preventDefault();

        if (!form.name || !form.note || !form.date || !form.amount) {
            return;
        }

        if (editId) {
            await fetch("http://localhost:3000/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id: editId,
                    ...form
                })
            });

            setEditId(null);
        } else {
            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
        }

        getKhata();
        setForm({
            name: "",
            note: "",
            date: "",
            amount: ""
        });
    };
    const deleteItem = async (index) => {
        let c = confirm("Are you sure you want to delete this item?");

        if (c) {
            const item = formArray[index];

            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: item._id,
                }),
            });

            const newArray = [...formArray];
            newArray.splice(index, 1);
            setFormArray(newArray);
        }
    };
    const editItem = (index) => {
        const item = formArray[index];

        setForm({
            name: item.name,
            note: item.note,
            date: item.date.split("T")[0],
            amount: item.amount
        });

        setEditId(item._id);
    };

    return (

        <div style={{ backgroundColor: bgColor, minHeight: "100vh", paddingTop: "6px" }}>


            <div className='mx-auto ' style={{
                width: '100%',
                maxWidth: '960px',
                background: '#ffffff',
                borderRadius: '20px',
                boxShadow: '0 24px 60px rgba(15, 23, 42, 0.12)',
                padding: 'clamp(16px, 5vw, 32px)',
                margin: '0 auto',
            }}>
                <h2 className='text-center text-4xl font-bold'>Smart<span className='text-cyan-500'>Khata</span></h2>

                <form action="">
                    <div className="feilds" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '16px',
                        margin: '20px',
                    }}>

                        <input type="text" name="name" id="name" value={form.name} onChange={handleChange} placeholder='Enter Your Name' className='p-2.5 ring-green-500 ring-1 rounded-2xl' />
                        <input type="text" name="note" id="note" value={form.note} onChange={handleChange} placeholder='Enter Description' className='p-2.5 ring-green-500 ring-1 rounded-2xl' />
                        <input type="date" name="date" id="date" value={form.date} onChange={handleChange} placeholder='Enter Date' className='p-2.5 ring-green-500 ring-1 rounded-2xl' />
                        <input type="number" name="amount" id="amount" value={form.amount} onChange={handleChange} placeholder='Enter Your Ammount' className='p-2.5 ring-green-500 ring-1 rounded-2xl' />
                        <button onClick={saveButton} type="submit" className='p-2.5 ring-green-500 bg-green-400 cursor-pointer ring-1 rounded-2xl'>Save</button>
                    </div>
                </form>

                <div className="table w-full" style={{ marginTop: "30px" }}>
                    {formArray.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 'clamp(20px, 5vw, 40px)', color: '#94a3b8' }}>
                            <p style={{ fontSize: 'clamp(14px, 4vw, 16px)' }}>📋 No transactions yet. Add your first entry!</p>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto', borderRadius: '12px' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: 'clamp(12px, 2vw, 14px)',
                            }}>
                                <thead>
                                    <tr style={{
                                        backgroundColor: '#f0f9ff',
                                        borderBottom: '2px solid #06b6d4',
                                    }}>
                                        <th style={{ padding: 'clamp(12px, 2vw, 16px)', textAlign: 'left', fontWeight: '600', color: '#0c4a6e' }}>Name</th>
                                        <th style={{ padding: 'clamp(12px, 2vw, 16px)', textAlign: 'left', fontWeight: '600', color: '#0c4a6e', display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>Description</th>
                                        <th style={{ padding: 'clamp(12px, 2vw, 16px)', textAlign: 'left', fontWeight: '600', color: '#0c4a6e', display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>Date</th>
                                        <th style={{ padding: 'clamp(12px, 2vw, 16px)', textAlign: 'left', fontWeight: '600', color: '#0c4a6e' }}>Amount</th>
                                        <th style={{ padding: 'clamp(12px, 2vw, 16px)', textAlign: 'center', fontWeight: '600', color: '#0c4a6e' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formArray.map((item, index) => {
                                        const date = new Date(item.date);
                                        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

                                        return (

                                            <tr key={index} style={{
                                                borderBottom: '1px solid #e2e8f0',
                                                transition: 'background-color 0.2s',
                                                display: 'table-row',
                                            }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                                <td style={{ padding: 'clamp(12px, 2vw, 16px)', fontWeight: '500', color: '#1e293b' }}>{item.name}</td>
                                                <td style={{ padding: 'clamp(12px, 2vw, 16px)', color: '#64748b', display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>{item.note}</td>
                                                <td style={{ padding: 'clamp(12px, 2vw, 16px)', color: '#64748b', display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>{formattedDate}</td>
                                                <td style={{ padding: 'clamp(12px, 2vw, 16px)', textAlign: 'left', fontWeight: '600', color: '#059669' }}>Rs. {item.amount}</td>
                                                <td style={{ padding: 'clamp(12px, 2vw, 16px)', textAlign: 'center' }}>

                                                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                                                        <button
                                                            onClick={() => editItem(index)}
                                                            title="Edit"
                                                            className="flex items-center justify-center p-1 cursor-pointer"
                                                        >
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/nwfpiryp.json"
                                                                trigger="hover"
                                                                style={{ width: "clamp(28px, 5vw, 34px)", height: "clamp(28px, 5vw, 34px)" }}
                                                            />
                                                        </button>

                                                        <button
                                                            onClick={() => deleteItem(index)}
                                                            title="Delete"
                                                            className="flex items-center justify-center p-1 cursor-pointer "
                                                        >
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/egqwwrlq.json"
                                                                trigger="hover"
                                                                style={{ width: "clamp(28px, 5vw, 34px)", height: "clamp(28px, 5vw, 34px)" }}
                                                            />
                                                        </button>
                                                    </div>

                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Manager
