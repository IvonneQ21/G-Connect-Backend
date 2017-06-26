
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('campuses').del().then(function() {
        // Inserts seed entries
        return knex('campuses').insert([{
                id: 1,
                campus_name: 'Austin - 2nd Street District',
                campus_city: 'Austin',
                campus_state: 'Texas'
            }, {
                id: 2,
                campus_name: 'Boulder - Walnut',
                campus_city: 'Boulder',
                campus_state: 'Colorado'
            }, {
                id: 3,
                campus_name: 'Denver - Golden Triangle',
                campus_city: 'Denver',
                campus_state: 'Colorado'
            }, {
                id: 4,
                campus_name: 'Denver - Platte',
                campus_city: 'Denver',
                campus_state: 'Colorado'
            }, {
                id: 5,
                campus_name: 'New York - West SoHo',
                campus_city: 'New York',
                campus_state: 'New York'
            }, {
                id: 6,
                campus_name: 'Phoenix - Warehouse District',
                campus_city: 'Phoenix',
                campus_state: 'Arizona'
            }, {
                id: 7,
                campus_name: 'San Francisco - SoMa',
                campus_city: 'San Francisco',
                campus_state: 'California'
            }, {
                id: 8,
                campus_name: 'Seattle - Pioneer Square',
                campus_city: 'Seattle',
                campus_state: 'Washington'
            }
        ]);
    })
    .then(() => {
        return knex.raw("SELECT setval('campuses_id_seq', (SELECT MAX(id) FROM campuses))");
    });
};
