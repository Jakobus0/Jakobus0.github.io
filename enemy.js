//var names = ['Robin Devillers', 'Dylan Marquis', 'Clémence Schneider', 'Olivia Viard', 'Antoine Delarue', 'Léon Wagner', 'Adrien Mahe', 'Nino Gonzales', 'Lenny Brousse', 'Léa Verger', 'Amine Caron', 'Louna Lenfant', 'Anna Perrault', 'Pauline Dijoux', 'Tristan Gueye', 'Eden Brisset', 'Lenny Calvet', 'Noé Savary', 'Emma Morice', 'Joseph Rault', 'Laura Laurens', 'Océane Pons', 'Timéo Guignard', 'Sarah Yildiz', 'Pierre Robert', 'Ruben Gosselin', 'Lilou Larue', 'Mia Cordier', 'Emilie George', 'Yasmine Voisin', 'Yasmine Rault', 'Tom Robinet', 'Emma Lefevre', 'Nolan Riviere', 'Noé Forest', 'Ali Pain', 'Célia Chretien', 'Nour Guiot', 'Alexis Laroche', 'Malo Diaby', 'Joseph Lenormand', 'Gabriel Raynaud', 'Juliette Alonso', 'Maëlle Baret', 'Loan Genet', 'Loan Laville', 'Célia Afonso', 'Chloé Bouchet', 'Jade Metayer', 'Wassim Brahimi', 'Ilyes Aissaoui', 'Liam Gomez', 'Théo Grange', 'Louane Motte', 'Jules Chateau', 'Adèle Monnier', 'Léandre Rault', 'Lou Leclerc', 'Lya Ferry', 'Julie Lam', 'Zoé Guilbaud', 'Valentin Leonard', 'Quentin Ferre', 'Mael Toure', 'Théo Pierron', 'Mathys Sanchez', 'Lyna Serra', 'Jean Sery', 'Tom Berton', 'Sacha Genet', 'Julia Vieira', 'Loan Nguyen', 'Baptiste Caro', 'Gabin Brisson', 'Gabin Perrot', 'Mya Arnould', 'Rose Etheve', 'Laura Landry', 'Adam Chopin', 'Younes Roth', 'Simon Salles', 'Sofia Ba', 'Romain Lacaze', 'Raphaël Loison', 'Marie Hugon', 'Margot Robin', 'Eliott Grimaud', 'Soan Tavares', 'Rayan Arnould', 'Camille Hoarau', 'Mael Huynh', 'Louka Soler', 'Lola Lamarque', 'Lorenzo Kieffer', 'Emilie Quere', 'William Renaudin', 'Kenzo Henry', 'Baptiste Gandon', 'Martin Sanchez', 'Diego Pottie']
var names = ['Nassim-olivier Amrane', 'Rebecca Attali', 'Yoann avrane', 'Alexandre Baskar', 'Lilas Bordet', 'Youcef Bouzid', 'Lou Cheymol', 'Nour-elise Djelidi-robert', 'Nathan Frison', 'Oceane Hakem', 'Jay Kadz', 'Hélie Lacourcelle', 'Hadrien Loutrel', 'Emile Menegaux', 'Petar Mihajlovic', 'Simon Poirson', 'Jael Ribere', 'Amira Salmi', 'Ambroise Sirven', 'Philémon Varnet', 'William Wu', 'Salih Yilmaz', 'Haroon Zmerli']
class Enemy {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.speed = 3;
        this.speedVec = createVector(0, 0);
        this.size = 20;
        this.name = names[parseInt(random(0, names.length - 1))];
        this.color = [parseInt(random(0, 255)), parseInt(random(0, 255)), parseInt(random(0, 255))];
    }

    display() {
        let a = atan2(this.speedVec.x, this.speedVec.y);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(HALF_PI - a);
        triangle(this.size, 0, -this.size, -this.size, -this.size, this.size);
        pop();
        fill(this.color[0], this.color[1], this.color[2]);
        noStroke();
        text(this.name, this.pos.x, this.pos.y - this.size - 10);
        noFill();
        strokeWeight(3);
        stroke(255);
    }

    update(snake) {

        if (this.pos.x < 0) {
            this.speedVec.x *= -1;
            this.pos.x = 0;
        }
        if (this.pos.x > width - this.size) {
            this.speedVec.x *= -1;
            this.pos.x = width - this.size;
        }
        if (this.pos.y < 0) {
            this.speedVec.y *= -1;
            this.pos.y = 0;
        }
        if (this.pos.y > height - this.size) {
            this.speedVec.y *= -1;
            this.pos.y = height - this.size;

        }

        if (this.pos.dist(snake.pos[0]) > this.size + snake.rad) {
            this.pos.add(this.speedVec);
        }
    }

    collideOther(other, snake) {
        let minDist = Math.sqrt(2) * (this.size + other.size);
        if (this.pos.dist(other.pos) < minDist) {

            let d = p5.Vector.sub(other.pos, this.pos);
            d.setMag(minDist);
            let t = p5.Vector.add(this.pos, d);
            let a = p5.Vector.sub(t, other.pos).mult(0.03);
            this.speedVec.add(p5.Vector.mult(a, -1));
            other.speedVec.add(a);
        } else {
            this.speedVec.add(p5.Vector.sub(snake.pos[0], this.pos));
            this.speedVec.limit(this.speed);
        }
    }

}