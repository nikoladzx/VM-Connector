import client from '../config/client.js';

export const ldapService = {
  getAllRooms: () => {
    return new Promise((resolve, reject) => {
      const baseDN = 'ou=classrooms,dc=diplomski,dc=com';
      const opts = {
        filter: '(&(objectClass=room))',
        scope: 'one',
        attributes: ['cn', 'roomNumber']
      };
      client.search(baseDN, opts, (err, res) => {
        if (err) return reject(err);
        
        const rooms = [];
        res.on('searchEntry', (entry) => {
          if (entry.pojo) {
            const room = {};
            entry.pojo.attributes.forEach(attr => {
              if (attr.type === 'cn') {
                room.identifier = attr.values[0];
              } else if (attr.type === 'roomNumber') {
                room.roomNumbers = [...attr.values];
              }
            });
            rooms.push(room);
          }
        });
        
        res.on('error', reject);
        res.on('end', () => {
          if (rooms.length === 0) {
            reject(new Error('No rooms found'));
          } else {
            resolve(rooms);
          }
        });
      });
    });
  },

  getAllAdmins: () => {
    return new Promise((resolve, reject) => {
      const baseDN = 'ou=admins,dc=diplomski,dc=com';
      const opts = {
        filter: '(&(objectClass=simpleSecurityObject))',
        scope: 'one',
        attributes: ['userPassword', 'uid']
      };
      
      client.search(baseDN, opts, (err, res) => {
        if (err) return reject(err);
        
        const admins = [];
        res.on('searchEntry', (entry) => {
          if (entry.pojo) {
            const admin = {};
            entry.pojo.attributes.forEach(attr => {
              if (attr.type === 'uid') {
                admin.username = attr.values[0];
              } else if (attr.type === 'userPassword') {
                admin.password = attr.values[0];
              }
            });
            admins.push(admin);
          }
        });
        
        res.on('error', reject);
        res.on('end', () => {
          if (admins.length === 0) {
            reject(new Error('No admins found'));
          } else {
            resolve(admins);
          }
        });
      });
    });
  }
};