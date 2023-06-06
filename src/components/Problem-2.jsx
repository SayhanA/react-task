import { useState, useEffect } from 'react';

const Problem1 = () => {
    const [modalAOpen, setModalAOpen] = useState(false);
    const [modalBOpen, setModalBOpen] = useState(false);
    const [modalCOpen, setModalCOpen] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [onlyEven, setOnlyEven] = useState(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    //   get data from server
    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://contact.mediusware.com/api/contacts', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setContacts(data);
            console.log(data)
            setFilteredContacts(data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch contacts.');
            setLoading(false);
        }
    };

    const filterContacts = () => {
        let filtered = contacts;

        if (onlyEven) {
            filtered = filtered.filter((contact) => contact.id % 2 === 0);
        }

        if (searchQuery) {
            filtered = filtered.filter((contact) =>
                contact.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredContacts(filtered);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            filterContacts();
        }
    };

    const handleCheckboxChange = () => {
        setOnlyEven((prev) => !prev);
    };

    //   Modal A Handler
    const handleOpenModalA = () => {
        setModalAOpen(true);
        setModalBOpen(false);
        setModalCOpen(false);
        setSearchQuery('');
        setOnlyEven(false);
    };

    //   Modal B Handler
    const handleOpenModalB = () => {
        setModalAOpen(false);
        setModalBOpen(true);
        setModalCOpen(false);
        setSearchQuery('');
        setOnlyEven(false);
    };

    //   Modal Closer Handler
    const handleCloseModal = () => {
        setModalAOpen(false);
        setModalBOpen(false);
        setModalCOpen(false);
    };

    const handleOpenModalC = () => {
        // Logic to open Modal C with contact details
    };

    const handleModalScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;

        if (scrollHeight - scrollTop === clientHeight) {
            // Load next page of contacts
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        filterContacts();
    }, [searchQuery, onlyEven]);

    useEffect(() => {
        if (page > 1) {
            fetchNextPage();
        }
    }, [page]);

    const fetchNextPage = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://contact.mediusware.com/api/contacts?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setContacts((prevContacts) => [...prevContacts, ...data]);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch contacts.');
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
                <div className="col-12 text-center">
                    <button
                        className="btn btn-primary mx-2"
                        style={{ backgroundColor: '#46139f' }}
                        onClick={handleOpenModalA}
                    >
                        All Contact
                    </button>
                    <button
                        className="btn btn-primary mx-2"
                        style={{ backgroundColor: '#ff7f50' }}
                        onClick={handleOpenModalB}
                    >
                        US Contact
                    </button>
                </div>
            </div>

            {modalAOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal A</h5>
                            <button type="button" className="close" onClick={handleCloseModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center mb-3">
                                <label className="mr-2">Only even:</label>
                                <input
                                    type="checkbox"
                                    checked={onlyEven}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                onKeyPress={handleSearchInputKeyPress}
                            />
                            {loading && <p>Loading...</p>}
                            {error && <p>{error}</p>}
                            {!loading && !error && (
                                <ul className="list-group" onScroll={handleModalScroll}>
                                    {filteredContacts.map((contact) => (
                                        <li
                                            key={contact.id}
                                            className="list-group-item"
                                            onClick={() => handleOpenModalC(contact.id)}
                                        >
                                            {contact.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                style={{ backgroundColor: '#46139f' }}
                                onClick={handleOpenModalA}
                            >
                                Modal Button A
                            </button>
                            <button
                                className="btn btn-primary"
                                style={{ backgroundColor: '#ff7f50' }}
                                onClick={handleOpenModalB}
                            >
                                Modal Button B
                            </button>
                            <button className="btn btn-primary" onClick={handleCloseModal}>
                                Modal Button C
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalBOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal B</h5>
                            <button type="button" className="close" onClick={handleCloseModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center mb-3">
                                <label className="mr-2">Only even:</label>
                                <input
                                    type="checkbox"
                                    checked={onlyEven}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                onKeyPress={handleSearchInputKeyPress}
                            />
                            {loading && <p>Loading...</p>}
                            {error && <p>{error}</p>}
                            {!loading && !error && (
                                <ul className="list-group" onScroll={handleModalScroll}>
                                    {filteredContacts.map((contact) => (
                                        <li
                                            key={contact.id}
                                            className="list-group-item"
                                            onClick={() => handleOpenModalC(contact.id)}
                                        >
                                            {contact.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                style={{ backgroundColor: '#46139f' }}
                                onClick={handleOpenModalA}
                            >
                                Modal Button A
                            </button>
                            <button
                                className="btn btn-primary"
                                style={{ backgroundColor: '#ff7f50' }}
                                onClick={handleOpenModalB}
                            >
                                Modal Button B
                            </button>
                            <button className="btn btn-primary" onClick={handleCloseModal}>
                                Modal Button C
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalCOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal C</h5>
                            <button type="button" className="close" onClick={handleCloseModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Contact details */}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={handleCloseModal}>
                                Modal Button C
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Problem1;
