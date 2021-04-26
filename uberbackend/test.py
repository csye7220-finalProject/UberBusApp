import unittest
# from uberbackend import app
# from  import app

class TestStringMethods(unittest.TestCase):

    def setup(self):
        self.app.config['TESTING'] = True
        self.app.config['DEBUG'] = False
        self.app = app.test_client()

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            s.split(2)

    # def register(self, email, password, confirm):
    #     return self.app.post(
    #     '/register',
    #     data=dict(email=email, password=password, confirm=confirm),
    #     follow_redirects=True
    #     )
    
    # def test_valid_user_registration(self):
    #     response = self.register('test@gmail.com', 'FlaskIsAwesome', 'FlaskIsAwesome')
    #     self.assertEqual(response.status_code, 200)
    #     self.assertIn(b'Thanks for registering!', response.data)

    # def test_invalid_user_registration_different_passwords(self):
    #     response = self.register('test@gmail.com', 'FlaskIsAwesome', 'FlaskIsNotAwesome')
    #     self.assertIn(b'Field must be equal to password.', response.data)        

if __name__ == '__main__':
    unittest.main()